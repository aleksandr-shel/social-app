using backend.DTOs.Post;

namespace backend.DTOs.Group
{
    public class GroupPostDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public AuthorDto Author { get; set; }
        public DateTime Date { get; set; }
        public int Likes { get; set; }
        public bool Liked { get; set; }
        public ICollection<PostImageDto> Images { get; set; }
        public ICollection<PostDocumentDto> Documents { get; set; }
    }
}
