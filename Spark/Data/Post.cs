using System.ComponentModel.DataAnnotations;

namespace Spark.Data
{
    internal sealed class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        [StringLength(50)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public int AuthorId { get; set; }
    }
}
