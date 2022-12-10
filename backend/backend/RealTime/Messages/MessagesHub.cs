using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace backend.RealTime.Messages
{
    public class MessagesHub : Hub
    {
        private readonly HttpContext _httpContext;
        private readonly DataContext _context;
        private readonly ILogger<MessagesHub> _logger;

        public MessagesHub(HttpContext httpContext, DataContext context, ILogger<MessagesHub> logger)
        {
            _httpContext = httpContext;
            _context = context;
            _logger = logger;
        }
        public async Task SendMessage(MessageDto message)
        {
            var from = await _context.Users.FirstOrDefaultAsync(x => x.Email == _httpContext.User.FindFirstValue(ClaimTypes.Email));

            var to = await _context.Users.FindAsync(message.To);

            _logger.LogInformation(JsonSerializer.Serialize(from) + "\n" + JsonSerializer.Serialize(to));

        }

        public override async Task OnConnectedAsync()
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == _httpContext.User.FindFirstValue(ClaimTypes.Email));

            var httpContext = Context.GetHttpContext();
            var roomId = httpContext.Request.Query["roomId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            var messages = await _context.Messages.FirstOrDefaultAsync(x => x.Room.Id == roomId);

            await Clients.Caller.SendAsync("Messages", messages);
        }

    }
}
