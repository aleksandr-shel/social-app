using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Comment;
using backend.Models;
using backend.RealTime.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHubContext<MessagesHub> _hubContext;
        private readonly IMapper _mapper;

        public CommentsController(DataContext context, IHubContext<MessagesHub> hubContext, IMapper mapper)
        {
            _context = context;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostComments(Guid postId)
        {
            var comments = await _context.Comments
                .Where(x => x.Post.Id == postId)
                .OrderByDescending(x => x.Date)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(CreateCommentDto commentDto)
        {
            var user = await _context.Users
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == commentDto.PostId);
            var comment = new Comment
            {
                Content = commentDto.Content,
                Author = user,
                Post = post,
            };

            await _context.Comments.AddAsync(comment);

            var res = await _context.SaveChangesAsync() > 0;

            if (res)
            {
                //await _hubContext.Clients.Group(commentDto.PostId.ToString()).SendAsync("ReceiveComment", comment);

                return Ok(_mapper.Map<CommentDto>(comment));
            }

            return BadRequest("Error adding a comment");
        }

        [HttpPut("{commentId}")]
        public async Task<IActionResult> UpdateComment(Guid commentId, UpdateCommentDto commentDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var comment = await _context.Comments
                .Include(x => x.Author)
                .Include(x => x.Author.Images)
                .FirstOrDefaultAsync(x => x.Id == commentId);

            if (comment.Author.Id != user.Id)
            {
                return Unauthorized();
            }

            comment.Content = commentDto.Content;

            var res = await _context.SaveChangesAsync() > 0;

            if (res)
            {
                return Ok(_mapper.Map<CommentDto>(comment));
            }

            return BadRequest("Problem removing a comment");
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(Guid commentId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var comment = await _context.Comments
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == commentId);

            if (comment.Author.Id != user.Id)
            {
                return Unauthorized();
            }

            _context.Comments.Remove(comment);

            var res = await _context.SaveChangesAsync() > 0;

            if (res)
            {
                return Ok();
            }

            return BadRequest("Problem removing a comment");
        }
    }
}
