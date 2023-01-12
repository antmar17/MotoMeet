using Microsoft.EntityFrameworkCore;

namespace MotoMeetAPI.Models
{
    public class MotoMeetDbContext :DbContext
    {
        public MotoMeetDbContext(DbContextOptions<MotoMeetDbContext> options) : base(options) { 
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events{ get; set; }
        public DbSet<Review> Reviews{ get; set; }
    }
}
