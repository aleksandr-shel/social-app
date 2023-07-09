namespace backend.Models
{
    public class GroupFollower
    {
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public string FollowerId { get; set; }
        public AppUser Follower { get; set; }
    }
}
