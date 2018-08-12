import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angular-6-social-login'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem("channel", "general");
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...
        sessionStorage.setItem("userData",JSON.stringify(userData))
        sessionStorage.setItem('key',"okmlp==");
        this.router.navigate(["/chat"])
      }


    );
  }
}
