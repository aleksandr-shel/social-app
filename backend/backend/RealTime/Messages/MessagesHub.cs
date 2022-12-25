using AutoMapper;
using backend.Data;
using backend.DTOs.Messages;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace backend.RealTime.Messages
{
    public class MessagesHub : Hub
    {
        private readonly DataContext _context;
        private readonly ILogger<MessagesHub> _logger;
        private readonly IMapper _mapper;

        public MessagesHub(DataContext context, ILogger<MessagesHub> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task SendMessage(MessagePostDto message)
        {
            //var from = await _context.Users.FirstOrDefaultAsync(x => x.Email == _httpContext.User.FindFirstValue(ClaimTypes.Email));

            //var to = await _context.Users.FirstOrDefaultAsync(x => x.UserName == message.Username);

            //_logger.LogInformation(JsonSerializer.Serialize(from) + "\n" + JsonSerializer.Serialize(to));

        }

        public override async Task OnConnectedAsync()
        {
            //var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == _httpContext.User.FindFirstValue(ClaimTypes.Email));

            var httpContext = Context.GetHttpContext();
            string roomId = httpContext.Request.Query["roomId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            //var messages = _mapper.Map<List<MessageDto>>(await _context.Messages
            //    .Include(x => x.Room)
            //    .Include(x => x.Sender)
            //    .Include(x => x.Sender.Images)
            //    .Where(x => x.Room.Id.ToString() == roomId)
            //    .OrderByDescending(x => x.Date)
            //    .ToListAsync());

            //await Clients.Caller.SendAsync("LoadMessages", messages);
        }

        //public async Task SendComment(CommentDto commentDto)
        //{
        //    var comment = await _dynamoDbService.AddComment(commentDto);
        //    await Clients.Group(commentDto.VideoId)
        //        .SendAsync("ReceiveComment", comment);
        //}

        //public async Task DeleteComment(string videoId, string commentId)
        //{
        //    var result = await _dynamoDbService.DeleteCommentInVideo(videoId, commentId);
        //    if (result)
        //    {
        //        await Clients.Group(videoId)
        //            .SendAsync("DeleteComment", commentId);
        //    }
        //}

        //public override async Task OnConnectedAsync()
        //{
        //    var httpContext = Context.GetHttpContext();
        //    var videoid = httpContext.Request.Query["videoId"];
        //    await Groups.AddToGroupAsync(Context.ConnectionId, videoid);
        //    var result = await _dynamoDbService.GetVideoDynamoDb(videoid);
        //    if (result != null)
        //    {
        //        await Clients.Caller.SendAsync("LoadComments", result);
        //    }
        //}
    }
}
