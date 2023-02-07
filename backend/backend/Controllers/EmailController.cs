using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailSender _emailSender;

        public EmailController(EmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> TestSendEmail(EmailDto emailDto)
        {
            string htmlContent = $"<div style='background-color:blue; color:red;'>{emailDto.Message}</div>";
            await _emailSender.SendEmailAsync(emailDto.Email, "Test email", htmlContent);

            return Ok();
        }
    }
    public class EmailDto
    {
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
