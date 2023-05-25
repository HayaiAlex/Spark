using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using static System.Net.WebRequestMethods;

namespace Spark.Data
{
    internal static class PostsRepository
    {
        public class ClerkUser
        {
            public string id { get; set; }
            public string username { get; set; }
            public string profile_image_url { get; set; }
        }

        private static async Task<List<PostWithAuthor>> AddAuthorsToPosts(List<Post> posts)
        {
            var userIds = posts.Select(post => post.AuthorId).Distinct().ToList();

            string url = "https://api.clerk.com/v1/users";
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Environment.GetEnvironmentVariable("CLERK_API_KEY"));
            var response = await client.GetAsync(url);
            var users = await response.Content.ReadFromJsonAsync<List<ClerkUser>>();
            if (users == null) users = new List<ClerkUser>();

            // map clerk users to posts
            List<PostWithAuthor> postsWithAuthor = new List<PostWithAuthor>();
            posts.ForEach(post =>
            {
                var user = users.FirstOrDefault(user => user.id == post.AuthorId);
                PostWithAuthor newPost = new PostWithAuthor(post);

                if (user != null)
                {
                    newPost.Username = user.username;
                    newPost.ProfilePicture = user.profile_image_url;
                }
                else
                {
                    newPost.Username = "";
                    newPost.ProfilePicture = "";
                }

                postsWithAuthor.Add(newPost);
            });

            return postsWithAuthor;
        }

        internal async static Task<List<PostWithAuthor>> GetPostsAsync()
        {
            using (var db = new SparkDBContext())
            {
                var posts = await db.Posts.Take(100).ToListAsync();

                return await AddAuthorsToPosts(posts);
            }
        }

        internal async static Task<PostWithAuthor?> GetPostByIdAsync(int postId)
        {
            using (var db = new SparkDBContext())
            {
                Post? post =  await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
                if (post == null)
                {
                    return null;
                }

                var posts = new List<Post>();
                posts.Add(post);
                var postsWithAuthor = await AddAuthorsToPosts(posts);

                return postsWithAuthor[0];
            }
        }
        internal async static Task<Post?> GetBasicPostByIdAsync(int postId)
        {
            using (var db = new SparkDBContext())
            {
                Post? post = await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
                if (post == null)
                {
                    return null;
                }

                return post;
            }
        }

        internal async static Task<bool> CreatePostAsync(Post post)
        {
            using (var db = new SparkDBContext())
            {
                try
                {
                    await db.Posts.AddAsync(post);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception err)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> UpdatePostAsync(Post post)
        {
            using (var db = new SparkDBContext())
            {
                try
                {
                    db.Posts.Update(post);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception err)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new SparkDBContext())
            {
                try
                {
                    Post post = await GetBasicPostByIdAsync(postId);

                    if (post != null)
                    {
                        db.Remove(post);
                    }

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception err)
                {
                    return false;
                }
            }
        }

    }
}
