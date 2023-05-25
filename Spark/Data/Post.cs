using System.ComponentModel.DataAnnotations;

namespace Spark.Data
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        [StringLength(50)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string AuthorId { get; set; }
    }
}
