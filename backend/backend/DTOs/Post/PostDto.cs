using backend.DTOs.Comment;
using backend.Models;

namespace backend.DTOs.Post
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public AuthorDto Author { get; set; }
        public DateTime Date { get; set; }
        public int Likes { get; set; }
        public bool Liked { get; set; }
        public int CommentsTotal { get; set; }
        public ICollection<PostImageDto> Images { get; set; }
        public ICollection<PostDocumentDto> Documents { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}
