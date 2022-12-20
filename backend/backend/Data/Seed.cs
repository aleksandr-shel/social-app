using backend.Helper;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    public class Seed
    {

        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        FirstName = "Aleksandr",
                        LastName = "Shelukheev",
                        Email = "alex@test.com",
                    },
                    new AppUser
                    {
                        FirstName = "John",
                        LastName = "Connor",
                        Email = "connor@test.com",
                    },
                    new AppUser
                    {
                        FirstName = "Jack",
                        LastName = "Shephard",
                        Email = "shephard@test.com",
                    },
                    new AppUser
                    {
                        FirstName = "Harry",
                        LastName = "Potter",
                        Email = "potter@test.com",
                    },
                };

                foreach (var user in users)
                {
                    user.UserName = UsernameGenerator.Generate();
                    user.About = $"We don't know much about {user.FirstName}, but we're sure {user.FirstName} is great.";
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }
        }
    }
}
