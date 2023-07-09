namespace backend.Models
{
    public class GroupAdmin
    {
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
