using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MotoMeetAPI.Models
{
    public class Event
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        [ForeignKey("User")]
        public int organizer_id { get; set; }

        public DateTime meet_time { get; set; }

        public string meet_location { get; set; }

        public float distance { get; set; }

        public string description { get; set; }
        public string rules { get; set; }



        //creates many to many relationship 
        public Event(){
            this.Users= new HashSet<User>();
        }
        public virtual ICollection<User> Users{ get; set; }

    }
}
