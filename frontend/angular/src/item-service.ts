import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";
import {firstValueFrom} from "rxjs";

export interface Items {
  items: Item[]
}

export interface Item {
  id: number | null
  name: string
  amount: number
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private readonly http: HttpClient,
              private readonly userService: UserService) { }

  public async getAllItems(): Promise<Items> {
    return await firstValueFrom(this.http.get<Items>("http://localhost:5000/api/items", {
      headers: {
        "Authorization": this.userService.authorizationHeader()
      }
    }))
  }

  public async getItem(id: number): Promise<Item> {
    return await firstValueFrom(this.http.get<Item>(`http://localhost:5000/api/items/${id}`, {
      headers: {
        "Authorization": this.userService.authorizationHeader()
      }
    }))
  }

  public async updateItem(item: Item): Promise<Item> {
    return await firstValueFrom(this.http.put<Item>(`http://localhost:5000/api/items/${item.id}`, item, {
      headers: {
        "Authorization": this.userService.authorizationHeader()
      }
    }))
  }

  public async createItem(item: Item): Promise<Item> {
    return await firstValueFrom(this.http.post<Item>(`http://localhost:5000/api/items`, item, {
      headers: {
        "Authorization": this.userService.authorizationHeader()
      }
    }))
  }

  public async deleteItem(id: number): Promise<Item> {
    return await firstValueFrom(this.http.delete<Item>(`http://localhost:5000/api/items/${id}`, {
      headers: {
        "Authorization": this.userService.authorizationHeader()
      }
    }))
  }
}
