import { ShoppingList } from './../modules/shopping-list';
import { Router } from '@angular/router';
import { Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { UtilService } from './util.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class ApiService {
  login: boolean;
  userProfile: any;
  sg: any;
  tokyo: any;

  constructor(
    private http: HttpClient,
    private ht: Http,
    private afAuth: AngularFireAuth,
    private util: UtilService,
    private router: Router
  ) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.login = true;
      } else {
        this.login = false;
        this.util.navigate(['/login']);
      }
    });

  }

  getlist(uid, url): Observable<HttpResponse<any>> {

    if (url === 'sg') {
      url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/get-shopping-list';
    } else {
      url = 'https://bwe8cl0li3.execute-api.ap-northeast-1.amazonaws.com/dev/get-shopping-list';

    }
    return this.http.get(url + '?user_id=' + uid, { observe: 'response' });
  }

  push(url, post): Observable<HttpResponse<any>> {
    if (url === 'sg') {
      url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/create-shopping-list';
    } else {
      url = 'https://bwe8cl0li3.execute-api.ap-northeast-1.amazonaws.com/dev/create-shopping-list';
    }
    console.log(url + post);
    return this.http.get(url + post , { observe: 'response' });

  }


  get_item(url, name, date) {

    if (url === 'sg') {
      url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/get-shopping-item';
    } else {
      url = 'https://bwe8cl0li3.execute-api.ap-northeast-1.amazonaws.com/dev/get-shopping-item';

    }
    return this.http.get(url + '?sl_name=' + name + '&datetime=' + date, { observe: 'response' });

  }

  del(url, name, date) {
    if (url === 'sg') {
      url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/delete-shopping-list';
    } else {
      url = 'https://bwe8cl0li3.execute-api.ap-northeast-1.amazonaws.com/dev/delete-shopping-list';
    }
    
    return this.http.get(url + '?sl_name=' + name + '&datetime=' + date, { observe: 'response' });
  }


  // push(url, shoppinglist: ShoppingList): Promise<any> {
  //   const headers = new Headers({
  //     'Access-Control-Allow-Origin': 'http://localhost:4200/',
  //     'content-type': 'applicaiton/json',
  //     'Access-Control-Allow-Credentials': true

  //     // 'Access-Control-Allow-Methods': 'POST'
  //   });
  //   const options = new RequestOptions({ headers: headers });
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Credentials': 'true',
  //     })
  //   };

  //   if (url === 'sg') {
  //     url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/create-shopping-list';
  //   } else {
  //     url = 'https://bwe8cl0li3.execute-api.ap-northeast-1.amazonaws.com/dev/create-shopping-list';

  //   }
  //   return this.ht.post(url, shoppinglist, options).toPromise().then((res: any) => {
  //     this.extractData(res);
  //   }
  //   )
  //     .catch(this.handleErrorPromise);
  // }

  // pushto(data) {
  //   const url = 'https://n39vmvahp1.execute-api.ap-southeast-1.amazonaws.com/dev/create-shopping-list';

  //   // data.firstname = 'John';
  //   // data.lastname  = 'Snow';
  //   const json = JSON.stringify(data);
  //   console.log(json)
  //   const xhr = new XMLHttpRequest();

  //   if (xhr) {
  //   xhr.open('POST', url);

  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
  //   // xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  //   xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');

  //   xhr.send(json);
  //   // console.log(xhr.mode)
  //   }

  //   // xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  //   // xhr.onload = function () {
  //   //   const users = JSON.parse(xhr.responseText);
  //   //   console.log(users)
  //   //   if (xhr.readyState === 4 && xhr.status === 201) {
  //   //     console.table(users);
  //   //   } else {
  //   //     console.error(users);
  //   //   }
  //   // };
  //   // xhr.send(json);
  // }

  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     'Access-Control-Allow-Origin': '*',
  //   //     'Access-Control-Request-Method': 'DELETE,POST, GET'
  //   //   })
  //   // };
  //   // return this.http.delete(url, httpOptions).toPromise()
  //   //   .then((res: any) => {
  //   //     this.extractData(res);
  //   //     console.log(res);
  //   //   }
  //   //   )
  //   //   .catch(this.handleErrorPromise);
  // }





  extractData(res: Response) {
    const body = res;
    console.log(body);
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
  }
}


