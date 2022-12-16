using backend.Models;

namespace backend.DTOs.Post
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public AuthorDto Author { get; set; }
        public DateTime Date { get; set; }
    }
}
