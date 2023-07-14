using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    public partial class UpdatedGroupImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "GroupImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupImages", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_GroupImages_GroupBackGroundImageId",
                table: "Groups",
                column: "GroupBackGroundImageId",
                principalTable: "GroupImages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_GroupImages_GroupImageId",
                table: "Groups",
                column: "GroupImageId",
                principalTable: "GroupImages",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_GroupImages_GroupBackGroundImageId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_GroupImages_GroupImageId",
                table: "Groups");

            migrationBuilder.DropTable(
                name: "GroupImages");

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
    }
}
