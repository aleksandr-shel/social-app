using backend.DTOs.Post;

namespace backend.DTOs.Profile
{
    public class ProfileDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public string About { get; set; }

        public string Username { get; set; }
        public bool Online { get; set; }
        public DateTime Dob { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<ProfileImage> Images { get; set; }
        public ICollection<PostDto> Posts { get; set; }
        public bool Following { get; set; }
        public int Followers { get; set; }
        public int Followings { get; set; }

        public override bool Equals(object obj)
        {
            return obj is ProfileDto dto &&
                   FirstName == dto.FirstName &&
                   LastName == dto.LastName &&
                   ImageUrl == dto.ImageUrl &&
                   About == dto.About;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Username, FirstName, LastName, ImageUrl, About);
        }

        public static bool operator ==(ProfileDto left, ProfileDto right)
        {
            return EqualityComparer<ProfileDto>.Default.Equals(left, right);
        }

        public static bool operator !=(ProfileDto left, ProfileDto right)
        {
            return !(left == right);
        }
    }
}
