using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MotoMeetAPI.DTOs;
using MotoMeetAPI.Models;

namespace MotoMeetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UsersController : ControllerBase
    {
        private readonly MotoMeetDbContext _context;

        public UsersController(MotoMeetDbContext context)
        {
            _context = context;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> Register(User user)
        {
            // Look for existing accounts
            var query = 
                from u in _context.Users
                where u.username == user.username ||
                u.email == user.email
                select u;

            if (query.Count() > 0)
                return NotFound("Username or email is already in use");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        // GET: api/Users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                int id = int.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Sid)?.Value);

                var query =
                    from u in _context.Users
                    where u.id == id
                    select u;

                User user = query.FirstOrDefault();
                user.password = null;
                return Ok(user);
            }

            return NotFound("No user was found");
        }


        [HttpPost("Username")]
        public async Task<ActionResult<User>> ViewUser(UserLogin login)
        {
            var query =
                from u in _context.Users
                where u.username.Equals(login.username)
                select u;

            User user = query.FirstOrDefault();
            if (user != null)
            {
                user.password = null;
                return Ok(user);
            }

            return NotFound("No user was found");
        }


        [HttpPost("Userid")]
        public async Task<ActionResult<User>> ViewUser(IntDTO userid)
        {
            var query =
                from u in _context.Users
                where u.id == userid.value
                select u;

            User user = query.FirstOrDefault();
            if (user != null)
            {
                user.password = null;
                return Ok(user);
            }

            return NotFound("No user was found");
        }
    }
}
