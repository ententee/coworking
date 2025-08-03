package com.ententee.coworking.items;

import com.ententee.coworking.entities.Item;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.StreamSupport;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ItemsDto getAllItems() {
        var items = StreamSupport.stream(itemRepository.findAll().spliterator(), false)
                .map(this::entityToDto)
                .toList();

        return new ItemsDto(items);
    }

    public ItemDto getItem(int id) {
        return itemRepository.findById(id)
                .map(this::entityToDto)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Item id %d not found", id)));
    }

    public ItemDto createItem(ItemDto item) {
        Item entity = dtoToEntity(item);
        entity = itemRepository.save(entity);
        return entityToDto(entity);
    }

    public ItemDto updateItem(ItemDto item) {
        Item entity = dtoToEntity(item);
        entity = itemRepository.save(entity);
        return entityToDto(entity);
    }

    public void deleteItem(int id) {
        itemRepository.deleteById(id);
    }

    private ItemDto entityToDto(Item entity) {
        return new ItemDto(entity.getItemId(), entity.getName(), entity.getAmount());
    }

    private Item dtoToEntity(ItemDto dto) {
        Item entity = new Item();
        entity.setItemId(dto.id());
        entity.setName(dto.name());
        entity.setAmount(dto.amount());
        return entity;
    }
}
