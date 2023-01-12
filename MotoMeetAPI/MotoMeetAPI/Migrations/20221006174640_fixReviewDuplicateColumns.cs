using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MotoMeetAPI.Migrations
{
    public partial class fixReviewDuplicateColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Events_event_id",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_authorid",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_targetid",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_authorid",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_event_id",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_targetid",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "authorid",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "targetid",
                table: "Reviews");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "authorid",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "targetid",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_authorid",
                table: "Reviews",
                column: "authorid");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_event_id",
                table: "Reviews",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_targetid",
                table: "Reviews",
                column: "targetid");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Events_event_id",
                table: "Reviews",
                column: "event_id",
                principalTable: "Events",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_authorid",
                table: "Reviews",
                column: "authorid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_targetid",
                table: "Reviews",
                column: "targetid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
