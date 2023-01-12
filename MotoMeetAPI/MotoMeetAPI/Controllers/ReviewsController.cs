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
    public class ReviewsController : ControllerBase
    {
        private readonly MotoMeetDbContext _context;

        public ReviewsController(MotoMeetDbContext context)
        {
            _context = context;
        }

        // POST: api/Reviews
        [HttpPost]
        public ActionResult<Review> GetReview(IntDTO userid)
        {
            var reviews = 
                from r in _context.Reviews
                where r.target_id == userid.value
                select r;

            if (reviews.FirstOrDefault() == null)
            {
                return NotFound("No reviews were found");
            }

            return Ok(reviews.ToList());
        }

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create")]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            // Check if there is already a review by author to the target
            var query =
                from r in _context.Reviews
                where r.target_id == review.target_id
                && r.author_id == review.author_id
                select r;

            if (query.FirstOrDefault() != null)
                return BadRequest("User has already reviewed the target");

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Update average rating of user
            var ratings =
                from r in _context.Reviews
                where r.target_id == review.target_id
                select r.rating;

            User user =
                (from u in _context.Users
                where u.id == review.target_id
                select u).First();

            user.average_rating = (float)Math.Round(ratings.Average(), 2);
            _context.SaveChanges();

            return Ok(review);
        }
    }
}
