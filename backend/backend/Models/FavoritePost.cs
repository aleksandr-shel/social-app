namespace backend.Models
{
    public class FavoritePost
    {
        public string UserId { get; set; }
        public AppUser AppUser{ get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}
