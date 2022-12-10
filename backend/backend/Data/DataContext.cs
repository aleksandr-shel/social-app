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
        }
    }
}
