using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MotoMeetAPI.DTOs;
using MotoMeetAPI.Models;

namespace MotoMeetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class OrganizerController : ControllerBase
    {
        private readonly MotoMeetDbContext _context;

        public OrganizerController(MotoMeetDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult<Event> GetParticipants(IntDTO eventid)
        {
            var participants =
                from e in _context.Events
                where e.id == eventid.value
                select e.Users;

            return Ok(participants.ToList());
        }

        [HttpPost("{eventid}")]
        public ActionResult<Event> AddParticipant(int eventid, IntDTO userid)
        {   
            Event e = _context.Events.Find(eventid);
            User user = _context.Users.Find(userid.value);
            if (user == null || e == null)
                return BadRequest("Event or user doesn't exist");

            e.Users.Add(user);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException err) { 
            
                return BadRequest("User already in event");
            }

            return Ok("User added to event");
        }

        // Delete: api/Organizer
        [HttpDelete("{eventid}")]
        public IActionResult KickUser(UserLogin un, int eventid)
        {
            User user =
                (from u in _context.Users
                 where u.username == un.username
                 select u).First();

            // Only way I could get the delete method to work
            String connstring = "Server=(localdb)\\sqlexpress;Database=MotoMeetDB;Trusted_Connection=True;MultipleActiveResultSets=True;";
            using(SqlConnection conn = new SqlConnection(connstring))
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        $"DELETE FROM EventUser WHERE Eventsid = {eventid} " +
                        $"and Usersid = {user.id};";
                    cmd.ExecuteNonQuery();
                }
            }

            return Ok("User removed from event");
            
        }
    }
}
