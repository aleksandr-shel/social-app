using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    public partial class AddedPostImagesDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostImage_Posts_PostId",
                table: "PostImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostImage",
                table: "PostImage");

            migrationBuilder.RenameTable(
                name: "PostImage",
                newName: "PostImages");

            migrationBuilder.RenameIndex(
                name: "IX_PostImage_PostId",
                table: "PostImages",
                newName: "IX_PostImages_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostImages",
                table: "PostImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostImages_Posts_PostId",
                table: "PostImages",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostImages_Posts_PostId",
                table: "PostImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostImages",
                table: "PostImages");

            migrationBuilder.RenameTable(
                name: "PostImages",
                newName: "PostImage");

            migrationBuilder.RenameIndex(
                name: "IX_PostImages_PostId",
                table: "PostImage",
                newName: "IX_PostImage_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostImage",
                table: "PostImage",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostImage_Posts_PostId",
                table: "PostImage",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
