namespace backend.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public AppUser Author { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;

    }
}
