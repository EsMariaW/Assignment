import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // to use ngIf, etc.

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  user_type: any;
  groups: any;

  ngOnInit(){
    this.user_type = JSON.parse(sessionStorage.getItem("roles")!);
    this.groups = JSON.parse(sessionStorage.getItem("groups")!)
  }
}