import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { Routes,RouterModule } from '@angular/router';
import{SocialLoginModule,GoogleLoginProvider,AuthServiceConfig} from 'angular-6-social-login';
import{ HttpClientModule} from '@angular/common/http'

import {TwilioService} from './twilio.service';
import{AuthService} from'./auth.service';
import {AuthguardService} from './authguard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("224889169940-kltbp3595h4sf82oj92h69h11gkqle5v.apps.googleusercontent.com")
      }
    ]
);
  return config;
}

 const routes:Routes=[
   {
     path:'',
     component:LoginComponent,
     canActivate:[AuthguardService]
   },
   {
     path:'chat',
     component:ChatComponent,
     canActivate:[AuthService]
   },
   {
     path:'**',
     component:ChatComponent
   }
 ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
  
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TwilioService,
    AuthService,
    AuthguardService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
