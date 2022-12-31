using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.CustomAttributes;
using backend.Data;
using backend.DTOs.Profile;
using backend.Helper;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUploadFile _uploadFile;
        private readonly IMapper _mapper;

        public ProfileController(DataContext context, IUploadFile uploadFile, IMapper mapper)
        {
            _context = context;
            _uploadFile = uploadFile;
            _mapper = mapper;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            //var profile = _mapper.Map<ProfileDto>(await _context.Users
            //    .Include(x => x.Images)
            //    .Include(x => x.Posts.OrderByDescending(p=>p.Date))
            //    .FirstOrDefaultAsync(x => x.UserName == username));
            var profile = await _context.Users
               .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
               .FirstOrDefaultAsync(x => x.Username == username);

            return Ok(profile);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery]SearchParams search)
        {

            var queryArray = search.Q.Split();
            var result = new List<ProfileDto>();
            foreach (string q in queryArray)
            {
                result.AddRange(_mapper.Map<List<ProfileDto>>(await _context.Users
                    .Where(x => (x.FirstName + " " + x.LastName).Contains(q))
                    .Include(x => x.Images)
                    .ToListAsync()));
            }
            if (result.Count > 0)
            {
                return Ok(result.Distinct());
            }

            //return based on friends connection
            //result = _mapper.Map<List<ProfileDto>>(await _context.Users
            //    .Include(x => x.Images)
            //    .Take(10)
            //    .ToListAsync());

            return Ok();
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetProfiles()
        {
            //var profiles = _mapper.Map<List<ProfileDto>>(await _context.Users
            //    .Include(_ => _.Images)
            //    .ToListAsync());

            var profiles = await _context.Users
                .Include(_ => _.Images)
                .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .ToListAsync();

            return Ok(profiles);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileUpdateDto updateDto)
        {
            var user = await _context.Users
              .Include(x => x.Images)
              .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            user.About = updateDto.About;
            user.FirstName = updateDto.FirstName;
            user.LastName = updateDto.LastName;

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(_mapper.Map<ProfileDto>(user));
            }

            return BadRequest("Error updating profile info");
        }

        [HttpPost("Image")]
        [RequestSizeLimit(100000000)]
        public async Task<IActionResult> PostImage([FromForm]ProfilePostImageDto profilePostImageDto)
        {
            var user = await _context.Users
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            (string url, string key) = await _uploadFile.UploadFile(profilePostImageDto.Image);

            foreach(var img in user.Images)
            {
                img.IsMain = false;
            }

            var image = new Image
            {
                Url = url,
                Key = key,
                IsMain = true,
            };

            user.Images.Add(image);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(_mapper.Map<ProfileImage>(image));
            }

            return BadRequest("Error adding image");
        }

        [HttpPut("image/{key}")]
        public async Task<IActionResult> SetMain(string key)
        {
            var user = await _context.Users
               .Include(x => x.Images)
               .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            foreach (var img in user.Images)
            {
                img.IsMain = false;
            }

            var image = user.Images.FirstOrDefault(x => x.Key == key);
            image.IsMain = true;
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest("Error updating main image");
        }

        [HttpDelete("image/{key}")]
        public async Task<IActionResult> DeleteImage(string key)
        {
            var user = await _context.Users
              .Include(x => x.Images)
              .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var image = await _context.Images
                .FirstOrDefaultAsync(x => x.Key == key);

            if (!user.Images.Contains(image))
            {
                return Unauthorized("Don't have permission to delete this image");
            }

            var isDeleted = await _uploadFile.DeleteFile(key);

            if (isDeleted)
            {
                _context.Images.Remove(image);
            } else
            {
                return BadRequest("Problem deleting image from storage");
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest("Error deleting image");
        }

        [HttpGet("images")]
        public async Task<IActionResult> GetProfileImages()
        {
            var user = await _context.Users
              .Include(x => x.Images)
              .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var images = _mapper.Map<List<ProfileImage>>(user.Images);
            return Ok(images);
        }

        //[HttpGet("test")]
        //public async Task<IActionResult> test()
        //{
        //    var users = await _context.Users
        //        .Where(x => x.Email != User.FindFirstValue(ClaimTypes.Email))
        //        .ToListAsync();

        //    foreach(var user in users)
        //    {
        //        user.UserName = UsernameGenerator.Generate();
        //    }

        //    await _context.SaveChangesAsync();
        //    return Ok(users);
        //}

    }


    public class SearchParams
    {
        [Required]
        public string Q { get; set; }
    }
}
