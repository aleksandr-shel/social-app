using backend.CustomAttributes;

namespace backend.DTOs.Profile
{
    public class ProfilePostImageDto
    {
        [AllowedExtensions(new string[] { ".jpg", ".png", ".jpeg" })]
        public IFormFile Image { get; set; }
        public bool IsMain { get; set; } = false;
    }
}
