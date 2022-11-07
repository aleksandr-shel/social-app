using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        private string displayName;

        public string DisplayName
        {
            get { return displayName; }
            set { displayName = FirstName + " " + LastName; }
        }

    }
}
