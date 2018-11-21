import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) {

  }

  navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }
}
