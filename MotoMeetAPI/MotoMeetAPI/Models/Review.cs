using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MotoMeetAPI.Models
{
    public class Review
    {
        [Key]
        public int id { get; set; }


        [ForeignKey("User")]
        public int author_id { get; set; }
        //public virtual User author{ get; set; }


        [ForeignKey("User")]
        public int target_id { get; set; }
        //public virtual User target{ get; set; }


        public string description { get; set; }

        public int rating { get; set; }





    }
}
