package com.ententee.coworking.items;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping()
    public ItemsDto getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("{id}")
    public ResponseEntity<ItemDto> getItem(@PathVariable int id) {
        try {
            return ResponseEntity.ok(itemService.getItem(id));
        } catch(EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    public ItemDto createItem(@RequestBody ItemDto item) {
        return itemService.createItem(item);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateItem(@PathVariable int id, @RequestBody ItemDto item) {
        if (id != item.id()) {
            return new ResponseEntity<>("Id in path mismatches the provided entity", HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(itemService.updateItem(item));
    }

    @DeleteMapping("{id}")
    public void deleteItem(@PathVariable int id) {
        itemService.deleteItem(id);
    }
}
