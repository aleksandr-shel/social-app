using AutoMapper;
using backend.Data;
using backend.DTOs.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text.Json;
using System.Xml.Serialization;

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


        public async Task ConnectToPostCommentsSection(string postId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, postId);
        }

        public async Task DisconnectFromPostCommentsSection(string postId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, postId);
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine("Connected");
            var httpContext = Context.GetHttpContext();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == httpContext.User.FindFirstValue(ClaimTypes.Email));
            if (user != null)
            {
                //implement later, too much headache
                //user.Online = true;
                //await _context.SaveChangesAsync();

                await Groups.AddToGroupAsync(Context.ConnectionId, user.Id);
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            //implement later, too much headache
            //var httpContext = Context.GetHttpContext();
            //var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == httpContext.User.FindFirstValue(ClaimTypes.Email));
            //if (user != null)
            //{
            //    user.Online = false;
            //    await _context.SaveChangesAsync();
            //}
            Console.WriteLine("Connection terminated");
            return Task.CompletedTask;
        }

    }
}
