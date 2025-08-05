import {Component, OnInit, signal} from '@angular/core';
import {Item, Items, ItemService} from "../item-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.less'
})
export class ItemListComponent implements OnInit {
  protected items = signal<Item[]>([])

  constructor(private router: Router, private itemService: ItemService) {
  }

  public async ngOnInit() {
    const itemsResponse = await this.itemService.getAllItems()
    this.items.set(itemsResponse.items)
  }

  protected createItem() {
    this.router.navigate(['/createItem'])
  }

  protected openItem(item: Item) {
    this.router.navigate(['/itemDetail', item.id])
  }

  protected async deleteItem(item: Item) {
    await this.itemService.deleteItem(item.id!)
    this.items.set(this.items().filter(i => i.id !== item.id))
  }
}
