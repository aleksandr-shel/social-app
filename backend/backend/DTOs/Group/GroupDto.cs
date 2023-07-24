using backend.DTOs.Post;

namespace backend.DTOs.Group
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public bool IsAdmin { get; set; }
        public bool Follow { get; set; }
        public int Followers { get; set; }
        public string Image { get; set; }
        public string BackgroundImage { get; set; }

    }
}
