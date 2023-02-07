using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;

namespace backend.Services
{
    public class EmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string htmlContent)
        {
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var message = new SendGridMessage
            {
                From = new EmailAddress("shelukheevmail4development@gmail.com", _config["SendGrid:User"]),
                Subject = emailSubject,
                HtmlContent = htmlContent
            };
            message.AddTo(new EmailAddress(userEmail));
            message.SetClickTracking(false, false);

            await client.SendEmailAsync(message);
        }
    }
}
