using backend.DTOs.Profile;
using backend.Models;

namespace backend.DTOs.Messages
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Room Room { get; set; }
        public string Content { get; set; }
        public ProfileDto Sender { get; set; }
        public DateTime Date { get; set; }
    }
}
