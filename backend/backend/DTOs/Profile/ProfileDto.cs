using backend.DTOs.Post;

namespace backend.DTOs.Profile
{
    public class ProfileDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string About { get; set; }
        public ICollection<ProfileImage> Images { get; set; }
        public ICollection<PostDto> Posts { get; set; }
    }
}
