namespace backend.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public AppUser From { get; set; }
        public AppUser To { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
