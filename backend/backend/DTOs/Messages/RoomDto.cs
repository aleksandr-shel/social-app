using backend.DTOs.Post;

namespace backend.DTOs.Messages
{
    public class RoomDto
    {
        public Guid Id { get; set; }
        public List<AuthorDto> Users { get; set; }
    }
}
