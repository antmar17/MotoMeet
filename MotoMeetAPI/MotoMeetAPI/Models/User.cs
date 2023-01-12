using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MotoMeetAPI.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string email { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string username { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string password { get; set; }

        public string? bio { get; set; }

        public float? average_rating { get; set; }

        //creates many to many relationship 
        public User(){

            this.Events = new HashSet<Event>();
        }
        public virtual ICollection<Event> Events { get; set; }
    }
}
