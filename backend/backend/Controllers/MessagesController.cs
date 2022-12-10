using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Profile;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public MessagesController(DataContext context, UserManager<AppUser> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("users")]
        public async Task<IActionResult> AllUsers()
        {
            var profiles = _mapper.Map<List<ProfileDto>>(await _context.Users.Include(x=>x.Images).ToListAsync());
            return Ok(profiles);
        }

        [HttpGet]
        public async Task<IActionResult> AllMesages()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> WriteMessage()
        {


            return Ok();
        }
    }
}
