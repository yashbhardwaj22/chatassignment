import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService  implements CanActivate {

  constructor(private router:Router) { }
  canActivate(){
    if(sessionStorage.getItem("key2")=="aerwss=="){
      alert('You are already logged in.');
      this.router.navigate(['/chat']);
      return false;
    }
    return true;
  }
}
