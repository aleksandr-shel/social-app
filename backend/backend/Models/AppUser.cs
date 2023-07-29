using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string About { get; set; }
        public bool Online { get; set; }
        public DateTime Dob { get; set; }
        public string City { get; set; }
        public ICollection<RoomUser> Rooms { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<Document> Document { get; set; }
        public ICollection<Post> Posts { get; set; }

        public ICollection<Friends> Followers { get; set; }
        public ICollection<Friends> Followings { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
        public ICollection<FavoritePost> FavoritePosts { get; set; }
        public ICollection<GroupFollower> Groups { get; set; } = new List<GroupFollower>();
        public ICollection<GroupAdmin> GroupAdmins { get; set; } = new List<GroupAdmin>();
    }
}
