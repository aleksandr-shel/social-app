using backend.DTOs;
using backend.Helper;
using backend.Models;
using backend.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _conf;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly ILogger<AccountController> _logger;
        private readonly IConfigurationSection _googleAuthNSection;
        public AccountController(IConfiguration conf, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, ILogger<AccountController> logger)
        {
            _conf = conf;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _logger = logger;
            _googleAuthNSection = _conf.GetSection("Authentication:Google");
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            _logger.LogInformation(JsonSerializer.Serialize(loginDto));
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid Email");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (result.Succeeded)
            {
                //await SetRefreshToken(user);
                return Ok(CreateUserDto(user));
            }
            return Unauthorized("Invalid password");
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await _userManager.FindByEmailAsync(registerDto.Email) != null)
            {
                ModelState.AddModelError("Email","This email is already registered");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = UsernameGenerator.Generate(),
                About = $"We don't know much about {registerDto.FirstName}, but we're sure {registerDto.FirstName} is great."
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                //await SetRefreshToken(user);
                return Ok(CreateUserDto(user));
            }

            return BadRequest("Problem registering user");
        }

        [AllowAnonymous]
        [HttpPost("login-google")]
        public async Task<IActionResult> LoginGoogle([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");

            var user = await _userManager.FindByEmailAsync(payload.Email);

            if (user != null)
            {
                return Ok(CreateUserDto(user));
            } else
            {
                return BadRequest("Not registered");
            }
        }
        [AllowAnonymous]
        [HttpPost("register-google")]
        public async Task<IActionResult> RegisterGoogle([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");

            if (await _userManager.FindByEmailAsync(payload.Email) != null)
            {
                ModelState.AddModelError("Email", "This email is already registered");
                return ValidationProblem();
            }
            var user = new AppUser
            {
                Email = payload.Email,
                UserName = UsernameGenerator.Generate(),
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
                About = $"We don't know much about {payload.GivenName}, but we're sure {payload.GivenName} is great."
            };
            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                return Ok(CreateUserDto(user));
            }

            return BadRequest("Problem registering user");
        }

        [HttpGet("current")]
        public async Task<IActionResult> Current()
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            //await SetRefreshToken(user);
            return Ok(CreateUserDto(user));
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(x => x.RefreshTokens)
                .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
            if (user == null) return Unauthorized();
            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
            if (oldToken != null && !oldToken.IsActive) return Unauthorized();
            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;
          
            return Ok(CreateUserDto(user));
        }

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto
            {
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddSeconds(30),
            };
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuthDto externalAuth)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _googleAuthNSection["ClientId"] }
                };
                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                //log an exception
                _logger.LogError(ex.Message);
                return null;
            }
        }
    }
}
