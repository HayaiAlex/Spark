using Microsoft.EntityFrameworkCore;

namespace Spark.Data
{
    internal static class PostsRepository
    {
        internal async static Task<List<Post>> GetPostsAsync()
        {
            using (var db = new SparkDBContext())
            {
                return await db.Posts.ToListAsync();
            }
        }

        internal async static Task<Post> GetPostByIdAsync(int postId)
        {
            using (var db = new SparkDBContext())
            {
                Post? post =  await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
                post??= new Post {
                    PostId = 0,
                    CreatedAt = DateTime.Now,
                    Content = "👀",
                    AuthorId = "na"
                };
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
                    Post post = await GetPostByIdAsync(postId);

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
