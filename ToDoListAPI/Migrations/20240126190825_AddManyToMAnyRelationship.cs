using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddManyToMAnyRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SingleList",
                table: "SingleList");

            migrationBuilder.RenameTable(
                name: "SingleList",
                newName: "SingleLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SingleLists",
                table: "SingleLists",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ItemSingleList",
                columns: table => new
                {
                    ItemsId = table.Column<int>(type: "int", nullable: false),
                    SingleListsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemSingleList", x => new { x.ItemsId, x.SingleListsId });
                    table.ForeignKey(
                        name: "FK_ItemSingleList_Items_ItemsId",
                        column: x => x.ItemsId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemSingleList_SingleLists_SingleListsId",
                        column: x => x.SingleListsId,
                        principalTable: "SingleLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemSingleList_SingleListsId",
                table: "ItemSingleList",
                column: "SingleListsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemSingleList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SingleLists",
                table: "SingleLists");

            migrationBuilder.RenameTable(
                name: "SingleLists",
                newName: "SingleList");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SingleList",
                table: "SingleList",
                column: "Id");
        }
    }
}
