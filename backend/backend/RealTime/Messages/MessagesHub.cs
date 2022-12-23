using backend.Data;
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

        public MessagesHub(DataContext context, ILogger<MessagesHub> logger)
        {
            _context = context;
            _logger = logger;
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

            //var httpContext = Context.GetHttpContext();
            //var roomId = httpContext.Request.Query["roomId"];
            //await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            //var messages = await _context.Messages.FirstOrDefaultAsync(x => x.Room.Id == roomId);
            //await base.OnConnectedAsync();
        }

    }
}
