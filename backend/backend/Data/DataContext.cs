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
        public DbSet<PostImage> PostImages { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<FavoritePost> FavoritePosts { get; set; }
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


        }
    }
}
