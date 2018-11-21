import { Items } from './../modules/shopping-items';
import { ApiService } from './../service/api.service';
import { ShoppingList } from './../modules/shopping-list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  shoppingList: ShoppingList = new ShoppingList();
  shoppingname: String = '';
  items: any[] = [];
  item: Items = new Items();
  public: boolean;

  constructor(
    private api: ApiService,
  ) {
    this.api.checkuser();
  }

  ngOnInit() {
    this.public = false;
    this.item.name = '';
    this.item.quantity = 0;
    this.items.push(this.item);
  }

  addmoreitem() {
    const newItem = new Items;
    this.items.push(newItem);
  }

  put() {
    this.shoppingList.sl_name = this.shoppingname;
    this.shoppingList.user_id = this.api.userProfile.uid;
    if (this.public === true) {
      this.shoppingList.public = 'True';
    } else {
      this.shoppingList.public = 'False';
    }
    const url  = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/create-shopping-list';
    this.api.push(url, this.shoppingList);
  }

}
