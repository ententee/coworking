using ententeeWarehouse.DTOs;
using ententeeWarehouse.Model;

namespace ententeeWarehouse.Services;

public class ItemService
{
    private readonly WarehouseDbContext dbContext;

    public ItemService(WarehouseDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public List<Item> GetAllItems()
    {
        return dbContext.Items.ToList();
    }

    public Item? GetItemById(int id)
    {
        return dbContext.Items.Find(id);
    }

    public Item CreateItem(Item item)
    {
        dbContext.Items.Add(item);
        dbContext.SaveChanges();
        return item;
    }

    public void UpdateItem(Item item)
    {
        dbContext.Items.Update(item);
        dbContext.SaveChanges();
    }

    public void DeleteItem(int id)
    {
        Item? existingItem = GetItemById(id);
        if (existingItem != null)
        {
            dbContext.Items.Remove(existingItem);
            dbContext.SaveChanges();
        }
        // deleting non-existing item is not an error
    }

    public ItemDto ModelToDto(Item item)
    {
        return new ItemDto
        {
            Id = item.ItemId,
            Name = item.Name,
            Amount = item.Amount
        };
    }

    public Item DtoToModel(ItemDto dto)
    {
        return new Item
        {
            ItemId = dto.Id,
            Name = dto.Name,
            Amount = dto.Amount
        };
    }

    public ItemsDto ModelsToDtoCollection(List<Item> items)
    {
        return new ItemsDto
        {
            Items = items.Select(ModelToDto).ToList()
        };
    }
}