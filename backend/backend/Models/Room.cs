namespace backend.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; }
    }
}
