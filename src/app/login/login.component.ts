import { ApiService } from './../service/api.service';
import { UtilService } from './../service/util.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() login: boolean;
  @Output()userProfile: any;


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private util: UtilService,
    private api: ApiService,
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.login = true;
        console.log(this.router.url.split('/')[1]);
        if (this.router.url !== '/create' && this.router.url !== '/mylist' && this.router.url.split('/')[1] !== 'modify') {
          this.util.navigate(['home']);
        }
      } else {
        this.login = false;
      }
    }
    );
  }

  ngOnInit() {
  }

  signInWithGoogle() {
    try {
      const result = this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res: any) => {
          this.login = true;
          console.log(res);
          this.util.navigate(['home']);
        }
        );
    } catch (e) {
      console.error(e);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.login = false;
    this.userProfile = null;
    this.util.navigate(['home']);
  }

}
