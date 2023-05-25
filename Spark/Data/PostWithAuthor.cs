namespace Spark.Data
{

    public class PostWithAuthor
    {
        public int PostId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }
        public string AuthorId { get; set; }
        public string Username { get; set; }
        public string ProfilePicture { get; set; }
        public PostWithAuthor(Post post)
        {
            PostId = post.PostId;
            CreatedAt = post.CreatedAt;
            Content = post.Content;
            AuthorId = post.AuthorId;
        }
    }

}
