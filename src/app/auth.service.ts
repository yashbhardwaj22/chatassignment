import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../node_modules/@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(){
    if(sessionStorage.getItem("key")=="okmlp=="){
      return true;
    }
    alert('Session Timed-out');
    this.router.navigate(['/']);
    return false;
  }
}
