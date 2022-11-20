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
                        UserName = "alex"
                    },
                    new AppUser
                    {
                        FirstName = "John",
                        LastName = "Connor",
                        Email = "connor@test.com",
                        UserName = "connor"
                    },
                    new AppUser
                    {
                        FirstName = "Jack",
                        LastName = "Shephard",
                        Email = "shephard@test.com",
                        UserName = "shephard"
                    },
                    new AppUser
                    {
                        FirstName = "Harry",
                        LastName = "Potter",
                        Email = "potter@test.com",
                        UserName = "potter"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }
        }
    }
}
