namespace backend.Models
{
    public class RoomUser
    {
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
