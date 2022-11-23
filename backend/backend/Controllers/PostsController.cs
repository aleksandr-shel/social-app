using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PostsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var posts = await _context.Posts
                .Include(x => x.Author)
                .OrderByDescending(x => x.Date)
                .ToListAsync();
            var _posts = _mapper.Map<List<PostDto>>(posts);
            return Ok(_posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var post = await _context.Posts
                .Include(_x => _x.Author)
                .FirstOrDefaultAsync(x => x.Id == id);
            return Ok(_mapper.Map<PostDto>(post));
        }

        [HttpPost]
        public async Task<IActionResult> Create(PostCreateDto post)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var newPost = new Post
            {
                Content = post.Content,
                Author = user,
            };

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
                .Include(_x => _x.Author)
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
