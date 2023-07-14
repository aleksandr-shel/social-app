using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomUser> RoomUsers { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<PostImage> PostImages { get; set; }
        public DbSet<PostDocument> PostDocuments { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<FavoritePost> FavoritePosts { get; set; }


        //Group sets
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupFollower> GroupFollowers { get; set; }
        public DbSet<GroupPost> GroupPosts { get; set; }
        public DbSet<GroupAdmin> GroupAdmins { get; set; }
        public DbSet<GroupImage> GroupImages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RoomUser>(x => x.HasKey( ru => new {ru.RoomId, ru.UserId}));
            builder.Entity<RoomUser>()
                .HasOne(x => x.Room)
                .WithMany(x => x.RoomUsers)
                .HasForeignKey(x => x.RoomId);

            builder.Entity<RoomUser>()
                .HasOne(x => x.User)
                .WithMany(x => x.Rooms)
                .HasForeignKey(x => x.UserId);


            builder.Entity<Friends>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });
                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.NoAction);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<FavoritePost>()
                .HasKey(k => new { k.UserId, k.PostId });
            builder.Entity<FavoritePost>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.FavoritePosts)
                .HasForeignKey(fp => fp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FavoritePost>()
                .HasOne(x => x.Post)
                .WithMany(x => x.UserLikes)
                .HasForeignKey(fp => fp.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<GroupFollower>()
                .HasKey(x => new { x.GroupId, x.FollowerId });
            builder.Entity<GroupFollower>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Followers)
                .HasForeignKey(x => x.GroupId);

            builder.Entity<GroupFollower>()
                .HasOne(x => x.Follower)
                .WithMany(x => x.Groups)
                .HasForeignKey(x => x.FollowerId);


            builder.Entity<GroupAdmin>()
                .HasKey(x => new { x.GroupId, x.UserId });
            builder.Entity<GroupAdmin>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Admins)
                .HasForeignKey(x => x.GroupId);
            builder.Entity<GroupAdmin>()
                .HasOne(x => x.User)
                .WithMany(x => x.GroupAdmins)
                .HasForeignKey(x => x.UserId);
            




        }
    }
}
