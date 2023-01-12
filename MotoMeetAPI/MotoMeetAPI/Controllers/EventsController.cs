using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class EventsController : ControllerBase
    {
        private readonly MotoMeetDbContext _context;

        public EventsController(MotoMeetDbContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public ActionResult<IEnumerable<Object>> GetEvents()
        {
            var events =
                from e in _context.Events
                join u in _context.Users
                on e.organizer_id equals u.id
                select new
                {   id = e.id,
                    name = e.name,
                    organizer = u.username,
                    meet_time = e.meet_time,
                    meet_location = e.meet_location,
                    distance = e.distance,
                    description = e.description,
                    rules = e.rules

                };


            return events.ToList();
        }


        // GET: api/Events/input
        [HttpGet("input")]
        public ActionResult<Event> GetEvent(ZipAndCity dto)
        {

            var events =
                from e in _context.Events
                where e.meet_location.Contains(dto.Zipcode)
                select e;

            if (events.FirstOrDefault() == null)
            {
                events =
                    from e in _context.Events
                    where e.meet_location.Contains(dto.City)
                    select e;

                if (events.FirstOrDefault() == null)
                    return NotFound("No events in your area");
            }

            return Ok(events);
        }

        // GET: api/Events/Organizer
        [HttpPost("Organizer")]
        public ActionResult<Event> GetOrgEvents(IntDTO orgid)
        {

            var events =
                from e in _context.Events
                where e.organizer_id == orgid.value
                select e;

            if (events.FirstOrDefault() == null)
            {
                return NotFound("User has made no events");
            }

            return Ok(events);
        }

        // GET: api/Events/Participant
        [HttpPost("Participant")]
        public ActionResult<Event> GetMyEvents(IntDTO userid)
        {

            var events =
                from u in _context.Users
                where u.id == userid.value
                select u.Events;

            if (events.FirstOrDefault() == null)
            {
                return NotFound("User is in no events");
            }

            return Ok(events);
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.id }, @event);
        }

        // GET: api/Events/Specific
        [HttpPost("Specific")]
        public ActionResult<Event> GetSpecificEvent(IntDTO eventid)
        {
            var @event = _context.Events.Find(eventid.value);

            if (@event == null)
            {
                return NotFound("Event doesn't exist");
            }

            return Ok(@event);
        }

    }
}
