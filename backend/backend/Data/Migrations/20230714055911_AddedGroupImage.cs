using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    public partial class AddedGroupImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Images_GroupBackGroundImageId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Images_GroupImageId",
                table: "Groups");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "PostImages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_PostImages_GroupBackGroundImageId",
                table: "Groups",
                column: "GroupBackGroundImageId",
                principalTable: "PostImages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_PostImages_GroupImageId",
                table: "Groups",
                column: "GroupImageId",
                principalTable: "PostImages",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_PostImages_GroupBackGroundImageId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_PostImages_GroupImageId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "PostImages");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Images_GroupBackGroundImageId",
                table: "Groups",
                column: "GroupBackGroundImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Images_GroupImageId",
                table: "Groups",
                column: "GroupImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
