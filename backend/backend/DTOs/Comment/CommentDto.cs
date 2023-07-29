using backend.DTOs.Post;

namespace backend.DTOs.Comment
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public AuthorDto Author { get; set; }
        public Guid PostId { get; set; }
    }
}
