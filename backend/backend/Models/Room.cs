namespace backend.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        public string LastMessage { get; set; }
        public DateTime LastUpdated { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; }
    }
}
