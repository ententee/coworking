using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ententeeWarehouse.Migrations
{
    public partial class AddSampleData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // B-crypt hash for password "admin", cost factor 10
            migrationBuilder.InsertData("Users", 
                new[] { "Username", "Password" }, 
                new[] { "admin",  "$2y$10$UV1SIKfT149VV7yTN8RnW.iVNCK1YmqmTV2KQARFSEbd6gcVOabkK"}
            );

            migrationBuilder.InsertData("Items",
                new[] { "Name", "Amount" },
                new object[] { "Vysavač", 10});
            
            migrationBuilder.InsertData("Items",
                new[] { "Name", "Amount" },
                new object[] { "Krabice hřebíků 30mm", 40});
            
            migrationBuilder.InsertData("Items",
                new[] { "Name", "Amount" },
                new object[] { "Disketa s Windows 95, Originál", 1});
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("Users", "Username", "admin");

            migrationBuilder.DeleteData("Items", "Name", "Vysavač");
            migrationBuilder.DeleteData("Items", "Name", "Krabice hřebíků 30mm");
            migrationBuilder.DeleteData("Items", "Name", "Disketa s Windows 95, Originál");
        }
    }
}