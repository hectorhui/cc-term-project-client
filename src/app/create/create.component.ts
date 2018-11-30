import { Router } from '@angular/router';
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
  date: any;
  sl_name: any;
  res_status: any;
  res_status_01: any;
  push_status: any;
  topushtime: any;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.router.url !== '/create') {
      this.date = this.router.url.split('/')[3];
      this.sl_name = this.router.url.split('/')[2];
      this.get(this.sl_name, this.date);
    } else {
      this.public = false;
      this.item.item_name = '';
      this.item.quantity = null;
      this.items.push(this.item);
    }

  }


  addmoreitem() {
    const newItem = new Items;
    this.items.push(newItem);
  }

  get(name, date) {
    this.api.get_item('sg', name, date).subscribe(
      (res) => {
        console.log(res.status)
        this.res_status_01 = res.status;
        if (this.res_status_01 === 200) {
          this.setlist(res.body);

        }
      }
    );
    if (this.res_status_01 !== 200) {
      this.api.get_item('tokyo', name, date).subscribe(res => {
      });

    }
  }

  setlist(res: any) {
    this.shoppingList = res;
    this.shoppingname = this.shoppingList.sl_name;
    const temp = this.shoppingList.items;
    this.public = Boolean(this.shoppingList.public);
    for (let i = 0; i < temp.length; i++) {
      this.item.item_name = temp[i];
      this.item.quantity = 0;
      this.items.push(this.item);
    }
  }

  put() {

    // ?sl_name=february_party&datetime= &user_id=Elvis&public=False&items=["tea", "opium","quantity"]

  
    if (this.router.url !== '/create') {
      this.topushtime = this.date;
    } else {
      const time = new Date(); 
      this.topushtime = time.toISOString();
    }

    this.shoppingList.sl_name = this.shoppingname;
    this.shoppingList.user_id = this.api.userProfile.uid;
    this.shoppingList.datetime = this.topushtime;
    this.shoppingList.items = this.items;
    if (this.public === true) {
      this.shoppingList.public = 'True';
    } else {
      this.shoppingList.public = 'False';
    }

      // console.log(this.shoppingList);

      const slname = '?sl_name=' + this.shoppingname;
      const dt = '&datetime=' + this.topushtime;
      const uid = '&user_id=' + this.api.userProfile.uid;
      const spublic = '&public=' + this.shoppingList.public;
      const items = [];
      for (let i = 0; i < this.items.length; i++) {
        items.push('"' + this.items[i].item_name + '"');
      }

      const posfix = slname + dt + uid + spublic + '&items=[' + String(items) + ']';
      this.api.push('sg' , posfix).subscribe(res => {
        console.log(res);
        this.res_status = res.status;
        if (res.ok === true) {
          console.log('Sucessfully push');
        }
      });
      if (this.res_status !== 200) {
        this.api.push('tokyo' , posfix).subscribe(res => {
          if (res.ok === true) {
            console.log('Sucessfully push');
          }
        });
      }
      this.router.navigate(['/home']);
    }

}
