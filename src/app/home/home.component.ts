import { UtilService } from './../service/util.service';
import { Observable } from 'rxjs';
import { ShoppingList } from './../modules/shopping-list';
import { ApiService } from './../service/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgZone} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  islogin: boolean;
  user: any;
  name: any;
  uid: any;
  list: any[];

  constructor(
    private afauth: AngularFireAuth,
    private util: UtilService,
    private apiService: ApiService,
    private ngZone: NgZone,
  ) {
    this.islogin = false;
    this.afauth.auth.onAuthStateChanged(user => {
      if (user) {
        this.islogin = true;
        this.user = user;
        this.uid = user.uid;
        this.name = user.displayName;
      }
      if (!user) {
        this.islogin = false;
        this.util.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
    this.getshoppinglist();
  }
  getshoppinglist() {
    // const url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/get-shopping-list?user_id=' + this.uid ;
    const url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/get-shopping-list?user_id=hecteorhui';
    this.apiService.getlist(url).subscribe(
      (res: any) => {
      this.setlist(res);
      }
    );
  }
  setlist(res) {
    this.list = res;
    console.log();
  }

}
