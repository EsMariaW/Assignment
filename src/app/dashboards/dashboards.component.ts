import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // to use ngIf, etc.
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {
  user_type: any;
  userGroupsIDs: any;
  allGroups: any;
  channels: any;
  GroupChannels: any [] = [];  // [{groupID, groupName, channelID, channelName}]
  data: any;

  constructor(private router:Router, private httpClient: HttpClient){
    this.user_type = JSON.parse(sessionStorage.getItem("roles")!);
    this.userGroupsIDs = JSON.parse(sessionStorage.getItem("groups")!);
    this.httpClient.get("http://localhost:3000/dashboard")
      .subscribe(
        (data: any)=> {  // data from res.send()
          this.data = data;
          this.channels = this.data.channels;
          this.allGroups = this.data.groups;

          for (let group of this.allGroups){
            if (group.channelIDs.length>0){
              for (let channelID of group.channelIDs){
                let thisChannel = this.channels.find((ch:any)=> ch.channelID == channelID);
                let thisObj = {
                  groupID: group.groupID,
                  groupName: group.groupName,
                  channelID: channelID,
                  channelName: thisChannel.channelName,
                  numberOfChannels: group.channelIDs.length
                }
                this.GroupChannels.push(thisObj);
              }
            }
          }
        }
      )
  };

  getGroupName(searchID:any){
    let matchingGroup = this.GroupChannels.find(gc => gc.groupID == searchID);
    if (matchingGroup){
      return matchingGroup.groupName;
    }
  }

  getNumberOfChannels(searchID:any){
    let matchingGroup = this.GroupChannels.find(gc => gc.groupID == searchID);
    if (matchingGroup){
      return matchingGroup.numberOfChannels;
    }
  }

  getChannelName(searchID:any){
    let matchingChannel = this.GroupChannels.find(gc => gc.channelID == searchID);
    if (matchingChannel){
      return matchingChannel.channelName;
    }
  }

  getGroupChannels(searchID:any){
    let allChannels = this.allGroups[this.allGroups.findIndex((group:any) => group.groupID ==searchID)];
    if (allChannels){
      return allChannels.channelIDs;
    }
  }

  isNotMemberOf(searchID:any){
    let index = this.userGroupsIDs.findIndex((ugID:any) => ugID == searchID);
    return index == -1;
  }

  logOut(){ // when login button is pressed
    sessionStorage.clear();
    this.router.navigateByUrl('login'); // redirect user to login page
  }

  deleteAccount(){
    let username = sessionStorage.getItem("username");
    this.httpClient.post("http://localhost:3000/deleteAccount", {username})
    .subscribe({
      next: (response) => this.logOut()
    });
  }
}