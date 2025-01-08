using ententeeWarehouse.DTOs;
using ententeeWarehouse.Model;
using ententeeWarehouse.Services;
using Microsoft.AspNetCore.Mvc;

namespace ententeeWarehouse.Controllers;

[ApiController]
[Route("items")]
public class ItemController: ControllerBase
{
    private readonly ItemService itemService;

    public ItemController(ItemService itemService)
    {
        this.itemService = itemService;
    }


    [HttpGet]
    public ActionResult<ItemsDto> GetAll()
    {
        List<Item> items = itemService.GetAllItems();
        return Ok(itemService.ModelsToDtoCollection(items));
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<ItemDto> GetById(int id)
    {
        Item? item = itemService.GetItemById(id);
        if (item == null)
        {
            return NotFound();
        }
        return Ok(itemService.ModelToDto(item));
    }

    [HttpPost]
    public ActionResult<ItemDto> Create([FromBody] ItemDto itemDto)
    {
        Item createdItem = itemService.CreateItem(itemService.DtoToModel(itemDto));
        return Ok(itemService.ModelToDto(createdItem));
    }

    [HttpPut]
    [Route("{id}")]
    public ActionResult Update(int id, [FromBody] ItemDto itemDto)
    {
        if (id != itemDto.Id)
        {
            return BadRequest("Id mismatch");
        }
        
        itemService.UpdateItem(itemService.DtoToModel(itemDto));
        return Ok();
    }

    [HttpDelete]
    public ActionResult<ItemDto> Delete(int id)
    {
        itemService.DeleteItem(id);
        return Ok();
    }
}