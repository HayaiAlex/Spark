using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Spark.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Posts",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(972) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(1068) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(1071) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 4,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(1074) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 5,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(1076) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 6,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { "user_2QI1HUBJlRNcyGJNHON6JBBm4O7", new DateTime(2023, 5, 25, 16, 20, 46, 222, DateTimeKind.Local).AddTicks(1078) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "AuthorId",
                table: "Posts",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 25, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(1923) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 40, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2043) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 84, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2048) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 4,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 46, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2051) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 5,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 56, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2061) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 6,
                columns: new[] { "AuthorId", "CreatedAt" },
                values: new object[] { 68, new DateTime(2023, 5, 25, 10, 1, 54, 182, DateTimeKind.Local).AddTicks(2064) });
        }
    }
}
