using AutoMapper;
using AutoMapper.Configuration.Annotations;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.DTOs.Messages;
using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;
using backend.RealTime.Messages;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IHubContext<MessagesHub> _hubContext;

        public MessagesController(DataContext context, UserManager<AppUser> userManager, IMapper mapper, IHubContext<MessagesHub> hubContext)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _hubContext = hubContext;
        }
        [HttpGet]
        public async Task<IActionResult> AllMesages()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return Ok(user);
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetMessages(Guid roomId)
        {
            var messages = _mapper.Map<List<MessageDto>>( await _context.Messages
                .Include(x => x.Room)
                .Include(x => x.Sender)
                .Include(x => x.Sender.Images)
                .Where(x => x.Room.Id == roomId)
                .OrderByDescending(x => x.Date)
                .ToListAsync());
            return Ok(messages);
        }

        [HttpGet("rooms")]
        public async Task<IActionResult> GetRooms()
        {
            //get rooms that we are in
            var rooms = await _context.RoomUsers
                .Where(ru => ru.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier))
                .Select(ru => ru.Room)
                .ToListAsync();


            // get users of the rooms and grouped by room id
            var roomUsers = await _context.RoomUsers
                .Include(ru => ru.User)
                .Include(ru => ru.User.Images)
                .Where(ru => rooms.Contains(ru.Room))
                .GroupBy(ru => ru.RoomId)
                .Select(x => new { Id = x.Key, users = _mapper.Map<List<AuthorDto>>(x.Select(y => y.User).ToList()) })
                .ToListAsync();
            
            return Ok(roomUsers);
        }

        [HttpPost("{username}")]
        public async Task<IActionResult> SendMessage(string username, MessagePostDto message)
        {
            //await _hubContext.Clients.Client

            var user = await _context.Users
                .Include(x => x.Rooms)
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var toUser = await _context.Users
                .Include(x => x.Rooms)
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (message.RoomId != null)
            {
                var room = await _context.Rooms.FirstOrDefaultAsync(r => r.Id.ToString()==message.RoomId);
                var newMessage = new Message
                {
                    Room = room,
                    Content = message.Content,
                    Sender = user
                };
                var res = await _context.Messages.AddAsync(newMessage);
                await _context.SaveChangesAsync();
                var newMes = _mapper.Map<MessageDto>(res.Entity);
                await _hubContext.Clients.Group(room.Id.ToString()).SendAsync("ReceiveMessage", newMes);
                return Ok(newMes);
            }

            var newRoom = new Room
            {
                Id = Guid.NewGuid(),
                RoomUsers = new List<RoomUser>()
            };

            var newRoomUser = new RoomUser
            {
                Room = newRoom,
                RoomId = newRoom.Id,
                User = user,
                UserId = user.Id
            };

            var newRoomUser2 = new RoomUser
            {
                Room = newRoom,
                RoomId = newRoom.Id,
                User = toUser,
                UserId = toUser.Id
            };

            newRoom.RoomUsers.Add(newRoomUser);
            newRoom.RoomUsers.Add(newRoomUser2);

            await _context.Rooms.AddAsync(newRoom);

            var newMessage_ = new Message
            {
                Room = newRoom,
                Content = message.Content,
                Sender = user
            };

            var res_ = await _context.Messages.AddAsync(newMessage_);
            await _context.SaveChangesAsync();
            var newMes_ = _mapper.Map<MessageDto>(res_.Entity);
            await _hubContext.Clients.Group(newRoom.Id.ToString()).SendAsync("ReceiveMessage", newMes_);
            return Ok(newMes_);
        }

    }

}
