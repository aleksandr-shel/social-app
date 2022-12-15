using AutoMapper;
using backend.CustomAttributes;
using backend.Data;
using backend.DTOs.Profile;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var profile = _mapper.Map<ProfileDto>(await _context.Users
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email)));

            return Ok(profile);
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

            var image = user.Images.FirstOrDefault(x => x.Key == key);

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

    }
}
