using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Spark.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    AuthorId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "AuthorId", "Content", "CreatedAt" },
                values: new object[,]
                {
                    { 1, 25, "1⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(1923) },
                    { 2, 40, "2⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2043) },
                    { 3, 84, "3⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2048) },
                    { 4, 46, "4⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2051) },
                    { 5, 56, "5⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2061) },
                    { 6, 68, "6⚡", new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2064) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
