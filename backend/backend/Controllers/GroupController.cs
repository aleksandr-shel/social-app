using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Group;
using backend.DTOs.Post;
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
    public class GroupController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUploadFile _uploadFile;
        private readonly IMapper _mapper;
        private readonly ILogger<GroupController> _logger;

        public GroupController(DataContext context,
            IUploadFile uploadFile,
            IMapper mapper,
            ILogger<GroupController> logger)
        {
            _context = context;
            _uploadFile = uploadFile;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            //list of groups user follows
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var groups = await _context.GroupFollowers
                .Where(x => x.FollowerId == user.Id)
                .Select(x => x.Group)
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .ToListAsync();

            return Ok(groups);
        }

        [HttpGet("followers/{groupId}")]
        public async Task<IActionResult> ListOfFollowers(Guid groupId)
        {
            var followers = await _context.GroupFollowers.Where(x => x.GroupId == groupId)
                .Select(x => x.Follower)
                .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(followers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Group(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Name));

            var group = _context.Groups
                .Where(x => x.Id == id)
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .FirstOrDefault();
            return Ok(group);
        }
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromForm]GroupCreateDto group)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            //implement image and background image upload
            GroupImage groupImage = null;
            if (group.Image != null)
            {
                (string url, string key) = await _uploadFile.UploadFile(group.Image);
                groupImage = new GroupImage
                {
                    Url = url,
                    Key = key
                };
            }
            GroupImage groupBackgroundImage = null;
            if (group.BackgroundImage != null)
            {
                (string url, string key) = await _uploadFile.UploadFile(group.BackgroundImage);
                groupBackgroundImage = new GroupImage
                {
                    Url = url,
                    Key = key
                };
            }
            var newGroup = new Group
            {
                Name = group.Name,
                Description = group.Description,
                Category = group.Category,
                GroupImage = groupImage,
                GroupBackGroundImage = groupBackgroundImage
            };

            var groupAdmin = new GroupAdmin
            {
                GroupId = newGroup.Id,
                Group = newGroup,
                UserId = user.Id,
                User = user
            };

            newGroup.Admins.Add(groupAdmin);

            var groupFollower = new GroupFollower
            {
                GroupId = newGroup.Id,
                Group = newGroup,
                FollowerId = user.Id,
                Follower = user
            };
            newGroup.Followers.Add(groupFollower);
            var createdGroup = await _context.Groups.AddAsync(newGroup);
            var res = await _context.SaveChangesAsync() > 0;
            if (res)
            {
                return Ok(_mapper.Map<GroupDto>(createdGroup.Entity));
            }
            return BadRequest("Problem creating a group");
        }

        [HttpDelete("{groupId}")]
        public async Task<IActionResult> DeleteGroup(Guid groupId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var admins = await _context.GroupAdmins.Where(x => x.GroupId == groupId)
                .Select(x => x.User)
                .ToListAsync();
            if (!admins.Contains(user))
            {
                return Unauthorized("Not admin");
            }

            //Implement deletion of a group

            //also need to remove images from storage before deleting group from table
            var group = await _context.Groups
                .Include(x => x.GroupImage)
                .Include(x => x.GroupBackGroundImage)
                .FirstOrDefaultAsync(x => x.Id == groupId);

            if (group == null)
            {
                return BadRequest("No group with such id");
            }
            
            if (group.GroupImage != null)
            {
                var isRemoved = await _uploadFile.DeleteFile(group.GroupImage.Key);

                if (isRemoved)
                {
                    _context.GroupImages.Remove(group.GroupImage);
                }
            }

            if (group.GroupBackGroundImage != null)
            {
                var isRemoved = await _uploadFile.DeleteFile(group.GroupBackGroundImage.Key);
                if (isRemoved)
                {
                    _context.GroupImages.Remove(group.GroupBackGroundImage);
                }
            }

            _context.Groups.Remove(group);

            var res = await _context.SaveChangesAsync() > 0;

            if (!res)
            {
                return BadRequest("Problem removing a group");
            }

            return Ok();
        }
        [HttpPut("{groupId}/admin")]
        public async Task<IActionResult> ToggleAdmin(Guid groupId, string username)
        {
            //Implement set/unset admin
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGroup(GroupUpdateDto updateGroup)
        {
            //Implement update group info
            return Ok();
        }
        [HttpPost("follow/{groupId}")]
        public async Task<IActionResult> ToggleFollowGroup(Guid groupId)
        {
            _logger.LogInformation(groupId.ToString());

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var groupFollow_check = await _context.GroupFollowers.FindAsync(groupId, user.Id);

            if (groupFollow_check != null)
            {
                _context.Remove(groupFollow_check);
                var removed = await _context.SaveChangesAsync() > 0;
                if (removed)
                    return Ok(new { status = "unfollowed" });
                else
                    return BadRequest("Problem unfollowing");
            }

            var group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);

            var groupFollow = new GroupFollower
            {
                FollowerId = user.Id,
                Follower = user,
                GroupId = group.Id,
                Group = group
            };
            await _context.GroupFollowers.AddAsync(groupFollow);
            var res = await _context.SaveChangesAsync() > 0;
            if (res)
                return Ok(new { status = "followed" });


            return BadRequest("Problem following");
        }
    }
}
