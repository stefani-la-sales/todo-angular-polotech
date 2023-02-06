import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  createItem(item: Item) {
    let items = this.getAllItems();
    let id = 0;
    if(items.length > 0) {
      id = Number(items.reduce((previous: Item, current: Item)=> {
        if(previous.id! > current.id!) {
          return previous;
        } return current;
      }).id!);
    }
    item.id = (++id).toString();
    items.push(item);
    return window.localStorage.setItem('items', JSON.stringify(items));
  }

  getAllItems() {
    let json = window.localStorage.getItem('items');
    if(json) {
      return JSON.parse(json) as Item[];
    } else return [];
  }

  getOneItem(id: string) {
    let items = this.getAllItems();
    return items.find((item: Item) => {
      item.id == id;
    });
  }

  editItem(dataItem: Item) {
    let items = this.getAllItems();
    let index = items.findIndex(_item => _item.id == dataItem.id);
    items[index] = dataItem;

    return window.localStorage.setItem('items', JSON.stringify(items));
  }

  deleteItem(id: string) {
    let items = this.getAllItems();
    let index = items.findIndex(_item => _item.id == id);
    items.splice(index, 1);

    return window.localStorage.setItem('items', JSON.stringify(items));
  }
}
