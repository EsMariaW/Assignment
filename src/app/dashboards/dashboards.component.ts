import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // to use ngIf, etc.

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {
  user_type: any;
  groups: any;

  ngOnInit(){
    this.user_type = JSON.parse(sessionStorage.getItem("roles")!);
    this.groups = JSON.parse(sessionStorage.getItem("groups")!)
  }
}