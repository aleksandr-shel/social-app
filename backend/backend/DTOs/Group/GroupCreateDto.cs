namespace backend.DTOs.Group
{
    public class GroupCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile BackgroundImage { get; set; }

    }
}
