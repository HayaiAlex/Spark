using Microsoft.OpenApi.Models;
using Spark.Data;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://victorious-desert-06cd0c503.3.azurestaticapps.net");
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
    {
        swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { 
            Title = "Spark V1.0",
            Version = "v1"
        });
    });

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI((swaggerUIOptions) =>
{
    swaggerUIOptions.DocumentTitle = "Spark API";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Spark Api v1");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/get-all-posts",async () => await PostsRepository.GetPostsAsync())
    .WithTags("Posts");

app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    PostWithAuthor? post = await PostsRepository.GetPostByIdAsync(postId);
 
    if (post != null)
    {
        return Results.Ok(post);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts");

app.MapPost("/create-post", async (Post post) =>
{
    bool success = await PostsRepository.CreatePostAsync(post);

    if (success)
    {
        return Results.Ok("Success");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts");

app.MapPut("/update-post", async (Post post) =>
{
    bool success = await PostsRepository.UpdatePostAsync(post);

    if (success)
    {
        return Results.Ok("Success");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts");

app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool success = await PostsRepository.DeletePostAsync(postId);

    if (success)
    {
        return Results.Ok("Success");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts");

app.Run();
