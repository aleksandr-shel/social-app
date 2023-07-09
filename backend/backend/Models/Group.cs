namespace backend.Models
{
    public class Group
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public Image GroupImage { get; set; }
        public Image GroupBackGroundImage { get; set; }
        public ICollection<GroupAdmin> Admins { get; set; } = new List<GroupAdmin>();
        public ICollection<GroupFollower> Followers { get; set; } = new List<GroupFollower>();
        public ICollection<GroupPost> Posts { get; set; } = new List<GroupPost>();
    }
}
