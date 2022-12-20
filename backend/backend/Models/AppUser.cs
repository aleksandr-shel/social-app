using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string About { get; set; }
        public ICollection<RoomUser> Rooms { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<Post> Posts { get; set; }

        public ICollection<Friends> Followers { get; set; }
        public ICollection<Friends> Followings { get; set; }
    }
}
