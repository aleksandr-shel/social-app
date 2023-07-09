using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Core;
using backend.Data;
using backend.DTOs.Post;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<PostsController> _logger;
        private readonly IUploadFile _uploadFile;

        public PostsController(DataContext context, IMapper mapper, 
            ILogger<PostsController> logger, IUploadFile uploadFile)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _uploadFile = uploadFile;
        }

        [HttpGet]
        public async Task<ActionResult> List([FromQuery] PagingParams param)
        {
            var followings = await _context.Friends
                .Where(x => x.Observer.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Select(x => x.Target)
                .ToListAsync();
            // posts query of people which user follows
            var postsQuery = _context.Posts
                .Include(x => x.Images)
                .Include(x => x.Author)
                .Include(a => a.Author.Images)
                .Where(x => followings.Contains(x.Author))
                .OrderByDescending(x => x.Date)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) });
            //var _posts = _mapper.Map<List<PostDto>>(posts);

            return await HandlePagedList(postsQuery, param);

            // posts of every people in app
            //var posts_ = await _context.Posts
            //    .Include(x => x.Images)
            //    .Include(x => x.Author)
            //    .Include(a => a.Author.Images)
            //    .OrderByDescending(x => x.Date)
            //    .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
            //    .ToListAsync();
            //return Ok(posts_);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var post = await _context.Posts
                .Include(_x => _x.Images)
                .Include(_x => _x.Author)
                .Include(a => a.Author.Images)
                .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(_mapper.Map<PostDto>(post));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]PostCreateDto post)
        {
            
            var user = await _context.Users
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var newPost = new Post
            {
                Content = post.Content,
                Author = user,
            };


            if (post.Files != null)
            {
                if (post.Files.Length > 10) {
                    return BadRequest("No more than 10 images");
                }
                foreach(var file in post.Files)
                {
                    (string url, string key) = await _uploadFile.UploadFile(file);
                    var postImage = new PostImage
                    {
                        Url = url,
                        Key = key
                    };

                    newPost.Images.Add(postImage);
                }
            }

            await _context.Posts.AddAsync(newPost);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(_mapper.Map<PostDto>(newPost));
            }
            return BadRequest("Problem adding a post");

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PostUpdateDto updateDto)
        {
            var post = await _context.Posts
                .Include(x => x.Images)
                .Include(_x => _x.Author)
                .Include(a => a.Author.Images)
                .Include(x => x.UserLikes)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (post.Author.Id != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            post.Content = updateDto.Content;

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(_mapper.Map<PostDto>(post));
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var post = await _context
                .Posts
                .Include(x => x.Images)
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
            {
                return BadRequest("Not found this post");
            }

            if (post.Author.Id != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            foreach(var image in post.Images)
            {
                bool res = await _uploadFile.DeleteFile(image.Key);
                if (res)
                {
                    _context.PostImages.Remove(image);
                }
            }

            _context.Posts.Remove(post);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok();
            }
            return BadRequest("Problem deleting post");
        }
        
    }
}
