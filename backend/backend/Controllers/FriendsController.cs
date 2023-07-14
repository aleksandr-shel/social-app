using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FriendsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Friends()
        {
            var followings = _mapper.Map<List<ProfileDto>>(await _context.Friends
                .Where(x => x.Observer.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Include(x => x.Target.Images)
                .Select(x => x.Target)
                .ToListAsync());

            var followers = _mapper.Map<List<ProfileDto>>(await _context.Friends
                .Where(x => x.Target.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Include(x => x.Observer.Images)
                .Select(x => x.Observer)
                .ToListAsync());

            var friends = followers.Intersect(followings).ToList();

            var res = new
            {
                followers,
                followings
            };
            return Ok(res);
        }

        [HttpGet("{username}/followers/{n?}")]
        public async Task<IActionResult> Followers(string username, int n = 50)
        {
            var followers = await _context.Friends
                .Where(x => x.Target.UserName == username)
                .Select(x => x.Observer)
                .Take(n)
                .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider, new { currentUsername = username })
                .ToListAsync();
                
                
            return Ok(followers);
        }

        [HttpGet("followings")]
        public async Task<IActionResult> Followings()
        {
            var followings = _mapper.Map<List<ProfileDto>>(await _context.Friends
                .Where(x => x.Observer.UserName == User.FindFirstValue(ClaimTypes.Name))
                .Include(x => x.Target.Images)
                .Select(x => x.Target)
                .ToListAsync());
            return Ok(followings);
        }
        [HttpPost("{username}")]
        public async Task<IActionResult> ToggleFollow(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var toFollow = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (user == toFollow)
            {
                return BadRequest("you can't follow yourself");
            }

            var friends = await _context.Friends.FindAsync(user.Id, toFollow.Id);

            if (friends != null)
            {
                _context.Friends.Remove(friends);
            } else
            {
                friends = new Friends
                {
                    ObserverId = user.Id,
                    Observer = user,
                    TargetId = toFollow.Id,
                    Target = toFollow
                };
                await _context.Friends.AddAsync(friends);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
