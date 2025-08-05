import {Component, computed, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item, ItemService} from "../item-service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-item-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.less'
})
export class ItemDetailComponent {
  protected id = signal<number | null>(null)
  protected mode = computed(() => this.id() == null ? 'create' : 'edit');
  protected isLoading = signal(true)

  protected itemForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl(''),
    amount: new FormControl(0)
  })

  constructor(private readonly router: Router,
              private readonly itemService: ItemService,
              private readonly activatedRoute: ActivatedRoute) {

    const id = this.activatedRoute.snapshot.paramMap.get("id")
    if (id) {
      const parsedId = parseInt(id)
      this.id.set(parsedId)
      this.itemService.getItem(parsedId).then(item => {
        this.itemForm.setValue(item)
        this.isLoading.set(false)
      })
    } else {
      this.isLoading.set(false)
    }
  }

  protected async saveItem() {
    const item = this.itemForm.value as Item

    if (this.mode() == "edit") {
      await this.itemService.updateItem(item)
    } else {
      await this.itemService.createItem(item)
    }
    await this.router.navigate(["items"])
  }

  protected async back() {
    await this.router.navigate(["items"])
  }
}
