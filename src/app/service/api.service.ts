import { ShoppingList } from './../modules/shopping-list';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { UtilService } from './util.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  login: boolean;
  userProfile: any;

  constructor(
    private http: Http,
    private afAuth: AngularFireAuth,
    private util: UtilService,
    private router: Router
  ) {


  }

  checkuser() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.login = true;
        if (this.router.url !== '/create') {
          this.util.navigate(['home']);
        }
      } else {
        this.login = false;
      }
    }
    );

  }

  getlist(url): Observable<any[]> {
    return this.http.get(url).pipe(map((result: any) => {
      return result.json();
    }));
  }
  push(url, shoppinglist: ShoppingList): Promise<any> {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, shoppinglist, options).toPromise()
      .then((res: any) => {
        this.extractData(res);
      }
      )
      .catch(this.handleErrorPromise);
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}


