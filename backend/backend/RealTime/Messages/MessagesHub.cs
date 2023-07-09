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

        public async Task ConnectToRoom(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        }

        public async Task DisconnectFromRoom(string roomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }

        public override async Task OnConnectedAsync()
        {

            var httpContext = Context.GetHttpContext();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == httpContext.User.FindFirstValue(ClaimTypes.Email));
            string roomId = httpContext.Request.Query["roomId"];
            if (user != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, user.Id);
            }
        }
    }
}
