import { UtilService } from './../service/util.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: boolean;
  userProfile: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private util: UtilService
  ) {
    this.login = false;
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.login = true;
        if(this.router.url !== '/create') {
        this.util.navigate(['home']);
        }
      } else {
        this.login = false;
      }
    }
    );
  }

  signInWithGoogle() {
    try {
      const result = this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => this.login = true);
    } catch (e) {
      console.error(e);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.login = false;
    this.userProfile = null;
  }

}
