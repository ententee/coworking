using System.ComponentModel.DataAnnotations;

namespace ententeeWarehouse.DTOs;

public class ItemDto
{
    public int? Id { get; set; }
    [Required] public string Name { get; set; } = null!;
    public int Amount { get; set; }
}