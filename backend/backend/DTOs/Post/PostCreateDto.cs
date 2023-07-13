using backend.CustomAttributes;

namespace backend.DTOs.Post
{
    public class PostCreateDto
    {
        public string Content { get; set; }
        //[AllowedExtensions(new string[] { ".png",".jpg",".jpeg",".gif"})]
        public IFormFile[] Images { get; set; }
        public IFormFile[] Files { get; set; }
    }
}
