using backend.CustomAttributes;

namespace backend.DTOs.Profile
{
    public class ProfilePostImageDto
    {
        [AllowedExtensions(new string[] { ".jpg", ".png", ".jpeg" })]
        public IFormFile Image { get; set; }
    }
}
