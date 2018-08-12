import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TwilioService } from '../twilio.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor( private twilio: TwilioService,private router : Router ) { 
    this.userData = JSON.parse(sessionStorage.getItem("userData"))

    this.twilio.getUserChannel(this.userData.email).subscribe(res => {
      console.log(res);
      sessionStorage.setItem("userAllChannel",JSON.stringify(res));
     
    },
      err => {
        console.log(err)
      })
  }
  message: any;
  author: any;
  userData: any;
  userChanneldata=[];
  channelFag:boolean=false;
  msg: string = '';
  setInt: any;
  item:string='';
  reg:any;
  channelData:any;
  searchData=[];
  ngOnDestroy() {
    clearInterval(this.setInt);
  }
  ngOnInit() {
    
    sessionStorage.setItem("key2","aerwss==");
    this.userData = JSON.parse(sessionStorage.getItem("userData"))
    this.twilio.createUser(this.userData.email, this.userData.name).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })

    this.twilio.addToGeneralChannel(this.userData.email).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })
    this.setInt = setInterval(() => {
      this.twilio.getAllMessage().subscribe(res => {
        console.log(res);
        this.message = res.messages;

      },
        err => {
          console.log(err)
        })
    }, 1000)
    this.userData = JSON.parse(sessionStorage.getItem("userData"));

    this.twilio.getAllChannel().subscribe(res => {
      console.log(res);
      sessionStorage.setItem("allchannel",JSON.stringify(res));
      this.channelData = res;
    },
      err => {
        console.log(err)
      })

  }
  sendMsg() {

    if (this.msg=="") {
      return;
    }
    console.log(this.msg);
    this.twilio.sendMessage(this.msg, this.userData.email).subscribe(res => {
      console.log(res);
      this.msg = "";

    },
      err => {
        console.log(err)
      })
  }
  logout(){
    sessionStorage.clear();
    alert("You are logged out!!");
    this.router.navigate(['/']);
  }
  changeChannel(channel) {
    sessionStorage.setItem("channel", channel);
    console.log(channel);
  }
  addChannel() {
    var channelName = prompt("Please enter the channel name");
    if ((channelName == '') || (channelName == null)) {
      alert("Enter the channel name")
      return;
    }
    console.log(channelName)
    this.twilio.createChannel(channelName).subscribe(res => {
      console.log(res);
      this.twilio.addUserChannel(channelName, this.userData.email).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/chat"]));
      },
        err => {
          console.log(err)
        })
    },
      err => {
        alert("Channel already exists");
        console.log(err)
      })
  }

  showUserChannel(){
    this.userChanneldata.length=0;
    var AllChanenl=JSON.parse(sessionStorage.getItem("allchannel"));
    var userAllChannel = JSON.parse(sessionStorage.getItem("userAllChannel"));
    for(let channel of AllChanenl.channels){
      for(let uChannel of userAllChannel.channels){
        if(channel.sid == uChannel.channel_sid){
          this.userChanneldata.push(channel.unique_name);
        }
      }
    }
    this.channelFag=! this.channelFag;
    if(this.channelFag){
      document.getElementById("channelHeading").style.color="white";
    }
    else{
      document.getElementById("channelHeading").style.color="#AB9BA9";

    }

  }
  findchannel() {

    if (this.item.length < 3) {
      return;
    }
    this.item = this.item.toLowerCase();
    this.reg = new RegExp(this.item, "i");
    this.searchData.length = 0;
    for (let channel of this.channelData.channels) {
      if (this.reg.test(channel.unique_name)) {
        this.searchData.push(channel.unique_name)
      }
    }
  }

  addToChannel(id) {

    var confimAdd = window.confirm("Add this channel");
    if (confimAdd) {
      this.twilio.addUserChannel(id, this.userData.email).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/chat"]));

      },
        err => {
          alert("You are already member of this channel");
          this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/chat"]));
          console.log(err)
        })
    }
  }

  showAllChannel() {
    this.searchData.length = 0;
    for (let channel of this.channelData.channels) {
      this.searchData.push(channel.unique_name)
    }
  }
}




