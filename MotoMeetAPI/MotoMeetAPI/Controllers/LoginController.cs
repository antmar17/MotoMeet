using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MotoMeetAPI.DTOs;
using MotoMeetAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace MotoMeetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly MotoMeetDbContext _context;

        public LoginController(IConfiguration config, MotoMeetDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin login)
        {
            var user = Authenticate(login);

            if (user != null)
            {
                var token = Generate(user);
                return Ok(new { token });
            }

            return NotFound("Username or password is incorrect");
        }

        // Generates a Jwt
        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Sid, user.id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.username),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.GivenName, user.name)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(8),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Authenticates the login info
        private User Authenticate(UserLogin login)
        {
            var query =
             from u in _context.Users
             where u.username == login.username && u.password == login.password
             select u;

            User currentUser = query.FirstOrDefault();

            // Possible null return
            return currentUser;

        }


    }
}
