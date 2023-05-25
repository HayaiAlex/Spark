using Microsoft.EntityFrameworkCore;

namespace Spark.Data
{
    internal sealed class SparkDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=./Data/SparkDB.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSee = new Post[6];

            for (int i = 1; i <= postsToSee.Length; i++)
            {
                postsToSee[i-1] = new Post()
                {
                    PostId = i,
                    CreatedAt = DateTime.Now,
                    Content = $"{i}⚡",
                    AuthorId = "user_2QI1HUBJlRNcyGJNHON6JBBm4O7"
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSee);
        }

    }
}
