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
    }
}
