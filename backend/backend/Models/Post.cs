using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public AppUser Author { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public ICollection<PostImage> Images { get; set; } = new List<PostImage>();
        public ICollection<PostDocument> Documents { get; set; } = new List<PostDocument>();
        public ICollection<FavoritePost> UserLikes { get; set; }

    }
}
