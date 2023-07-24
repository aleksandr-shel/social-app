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
using System.ComponentModel.DataAnnotations;
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

        [HttpGet("manage")]
        public async Task<IActionResult> ListGroupToManage()
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var groups = await _context.GroupAdmins
                .Where(x => x.UserId == user.Id)
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

            var groupAdmin = await _context.GroupAdmins.FindAsync(groupId, user.Id);

            if (groupAdmin == null)
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
        public async Task<IActionResult> ToggleAdmin(Guid groupId, [FromQuery]string username)
        {
            var otheruser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            var groupAdmin = await _context.GroupAdmins.FindAsync(groupId, otheruser.Id);

            var adminsCount = _context.GroupAdmins.Where(x => x.GroupId == groupId).Count();

            if(groupAdmin == null)
            {
                var group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
                var newGroupAdmin = new GroupAdmin
                {
                    GroupId = groupId,
                    Group = group,
                    UserId = otheruser.Id,
                    User = otheruser,
                };

                await _context.GroupAdmins.AddAsync(newGroupAdmin);

                var res = await _context.SaveChangesAsync() > 0;

                if (res)
                {
                    return Ok();
                }

                return BadRequest("Problem giving the user an admin role");
            }

            if (adminsCount <= 1)
            {
                return BadRequest("The group can't be without admins");
            }

            _context.GroupAdmins.Remove(groupAdmin);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest("Problem giving the user an admin role");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGroup(GroupUpdateDto updateGroup)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var groupAdmin = await _context.GroupAdmins.FindAsync(updateGroup.Id, user.Id);

            if (groupAdmin == null)
            {
                return Unauthorized("Not admin");
            }

            var group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == updateGroup.Id);

            group.Description = updateGroup.Description;
            group.Category = updateGroup.Category;
            group.Name = updateGroup.Category;

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(_mapper.Map<GroupDto>(group));
            }

            return BadRequest("Problem updating a group");
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


        [HttpPost("post/{groupId}")]
        public async Task<IActionResult> PostInGroup(Guid groupId, [FromForm] PostCreateDto post)
        {
            var user = await _context.Users
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var groupAdmin = await _context.GroupAdmins.FindAsync(groupId, user.Id);

            if (groupAdmin == null)
            {
                return Unauthorized("Not admin");
            }

            var group = await _context.Groups.FindAsync(groupId);

            if (group == null)
            {
                return BadRequest("Not found a group with such id");
            }

            var newPost = new GroupPost
            {
                Content = post.Content,
                Author = user,
                Group = group,
            };


            if (post.Images != null)
            {
                if (post.Images.Length > 10)
                {
                    return BadRequest("No more than 10 images");
                }
                foreach (var file in post.Images)
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

            if (post.Files != null)
            {
                if (post.Files.Length > 10)
                {
                    return BadRequest("No more than 10 images");
                }
                foreach (var file in post.Files)
                {
                    (string url, string key) = await _uploadFile.UploadFile(file);
                    var postDoc = new PostDocument
                    {
                        Url = url,
                        Key = key,
                        Name = file.FileName,
                    };

                    newPost.Documents.Add(postDoc);
                }
            }

            await _context.GroupPosts.AddAsync(newPost);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(_mapper.Map<PostDto>(newPost));
            }
            return BadRequest("Problem adding a post");
        }

        [HttpDelete("post/{groupId}/{postId}")]
        public async Task<IActionResult> DeletePostInGroup(Guid groupId, Guid postId)
        {
            return Ok();
        }

        [HttpPut("post/{groupId}")]
        public async Task<IActionResult> UpdatePostInGroup(Guid groupId, PostUpdateDto updateDto)
        {
            return Ok();
        }

        [HttpGet("post/{groupId}")]
        public async Task<IActionResult> GetPosts(Guid groupId)
        {
            return Ok();
        }


        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] [Required]string q)
        {
            var groups = await _context.Groups
                .Where(x => x.Name.Contains(q))
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider, new { currentUsername = User.FindFirstValue(ClaimTypes.Name) })
                .OrderByDescending(x => x.Follow)
                .ToListAsync();
            return Ok(groups);
        }
    }
}
