import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TwilioService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUMzYjA0Y2FlZDM5NWI1MTUwOTA3OWJmMjk3Yzg5N2RlMjo4MTAwN2EwMmFhNGViZGQ4Y2RlZGI4MmY2NTE4ODA3Yg=='
    })
  };
  constructor(private http: HttpClient) { }

  createUser(identity,friendlyname): Observable<any> {

    return this.http.post<any>(url+"/Users",
     "FriendlyName="+friendlyname+"&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);
   
  }

  addToGeneralChannel(identity): Observable<any> {

    return this.http.post<any>(url+"/Channels/general/Members",
     "UniqueName =general&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);

  }

  getAllChannel(): Observable<any> {

    return this.http.get(url+"/Channels/",
     this.httpOptions);

  }

  addUserChannel(unique_name,identity): Observable<any> {
    return this.http.post<any>(url+"/Channels/"+unique_name+"/Members",
     "UniqueName ="+unique_name+"&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);

  }

  getUserChannel(identity): Observable<any> {

    return this.http.get(url+"/Users/"+identity+"/Channels/",
     this.httpOptions);

  }

  createChannel(channelName): Observable<any> {
    console.log(channelName)
        return this.http.post<any>(url+"/Channels/",
         "UniqueName="+channelName+"&ServiceSid="+serviceId, this.httpOptions);
      }

  getAllMessage(): Observable<any> {
    var channel = sessionStorage.getItem("channel");
    return this.http.get(url+"/Channels/"+channel+"/Messages",
    this.httpOptions);
  }

  sendMessage(msg,from): Observable<any> {
    var channel= sessionStorage.getItem("channel");
        return this.http.post<any>(url+"/Channels/"+channel+"/Messages",
         "UniqueName="+channel+"&Body="+msg+"&From="+from+"&ServiceSid="+serviceId, this.httpOptions);
    
      }

}
const serviceId:string='IS4d55d353b5eb4275b6ba0999faa1a56f';
const url:string='https://chat.twilio.com/v2/Services/'+serviceId;