import { LoginComponent } from './../login/login.component';
import { UtilService } from './../service/util.service';
import { ApiService } from './../service/api.service';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  islogin: any;
  user: any;
  name: any;
  uid: any;
  list: any[];
  currenturl: any;
  res_status: any;
  del_status: any;

  constructor(
    private util: UtilService,
    private apiService: ApiService,
    private router: Router,
    private lc: LoginComponent
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.islogin = true;
        this.user = user;
        this.uid = user.uid;
        this.name = user.displayName;
        this.getshoppinglist(this.uid);
      }
      if (!user) {
        this.islogin = false;
        this.util.navigate(['/login']);
      }
    });

    // this.user = this.lc.userProfile;
    // this.islogin = this.lc.login;
    // console.log(this.lc.login);
  }
  ngOnInit() {

    this.currenturl = this.router.url;
    this.getshoppinglist('Elvis');

  }

  getshoppinglist(uid) {
    this.apiService.getlist(uid, 'sg').subscribe(res => {
      this.res_status = res.status;
      if (this.res_status === 200) {
        this.setlist(res.body);
      }
    });
  console.log(this.res_status, uid)
    if (this.res_status !== 200) {
      this.apiService.getlist(uid, 'tokyo').subscribe(res => {
        this.setlist(res.body);
      });
    }

  }

  setlist(res) {
    this.list = res;
  }

  modify(name, date) {
    this.util.navigate(['/modify/' + date + '/' + name]);
    console.log('MOdify click');
  }

  del(name, date) {
    this.apiService.del('sg', name, date).subscribe(res => {
      this.del_status = res.status;
      if (this.res_status === 200) {
        console.log('Del form ');
      }
    });
    if (this.res_status !== 200) {
      this.apiService.del('tokyo', name, date).subscribe(res => {
        console.log('Del form ');
      });
    }
  }

}
