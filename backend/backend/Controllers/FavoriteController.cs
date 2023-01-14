using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Post;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FavoriteController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("{postId}")]
        public async Task<IActionResult> ToggleFavorite(Guid postId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == User.FindFirstValue(ClaimTypes.Name));
            if (user == null) return Unauthorized();
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return BadRequest("Post is not found");

            var favoritePost = await _context.FavoritePosts.FindAsync(user.Id, postId);
            if (favoritePost == null)
            {
                var favorite = new FavoritePost
                {
                    UserId = user.Id,
                    AppUser = user,
                    PostId = post.Id,
                    Post = post
                };
                await _context.FavoritePosts.AddAsync(favorite);
            } else
            {
                _context.FavoritePosts.Remove(favoritePost);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }
            return BadRequest("Error toggle favorite");
        }

        [HttpGet]
        public async Task<IActionResult> Favorites()
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));


            var favoritePosts = await _context.FavoritePosts
                .Where(x=>x.UserId == user.Id)
                .Select(x => x.Post)
                .OrderByDescending(x => x.Date)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .ToListAsync();

            return Ok(favoritePosts);
        }
    }
}
