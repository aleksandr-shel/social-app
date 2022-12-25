using backend.DTOs.Post;
using backend.DTOs.Profile;
using backend.Models;

namespace backend.DTOs.Messages
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string RoomId { get; set; }
        public string Content { get; set; }
        public AuthorDto Sender { get; set; }
        public DateTime Date { get; set; }
    }
}
