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

  // starts off: not showing anything
  showSuper: boolean = false;
  showGroup: boolean = false;
  showBasic: boolean = false;

  ngOnInit(){
    this.user_type = JSON.parse(sessionStorage.getItem("roles")!);
    console.log(this.user_type);

    if (this.user_type[0] === "super"){
      this.showSuper = true;
      alert("Super user")
    } else if (this.user_type[0] === "group"){
      this.showGroup = true;
      alert("Group user")
    } else {  // (this.user_type[0] === "basic")
      this.showBasic = true;
      alert("Basic user")
    }
  }
}