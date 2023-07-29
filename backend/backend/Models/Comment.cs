namespace backend.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Post Post { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public AppUser Author { get; set; } 
    }
}
