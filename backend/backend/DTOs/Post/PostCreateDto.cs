namespace backend.DTOs.Post
{
    public class PostCreateDto
    {
        public string Content { get; set; }
        public IFormFile[] Files { get; set; }
    }
}
