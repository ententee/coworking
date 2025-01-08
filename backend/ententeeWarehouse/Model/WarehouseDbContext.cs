using Microsoft.EntityFrameworkCore;

namespace ententeeWarehouse.Model;

public class WarehouseDbContext: DbContext
{
    public virtual DbSet<Item> Items { get; set; } = null!;
    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=sqlite_db/ententeeWarehouse.db");
    }
}