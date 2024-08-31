import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username = "";
  password = "";
  
  constructor(private router:Router, private httpClient: HttpClient){}

  login(){
    let user = {username: this.username, password: this.password};
    this.httpClient.post("http://localhost:3000/api/login", user,httpOptions)
      .subscribe(
        (data: any)=> {  // data from res.send()
          if(data == false){   
            alert("Please try again");
        
          } else {  // valid user has logged in
            // store their details in sessionStorage
            //    except for .password and .valid
            let allUsers = data.users;
            let index = allUsers.findIndex((user:any) => user.username == this.username);
            let thisUser = data.users[index];
            sessionStorage.setItem("username", thisUser.username.toString());
            sessionStorage.setItem("email", thisUser.email.toString());
            sessionStorage.setItem("id", thisUser.id.toString());
            sessionStorage.setItem("roles", JSON.stringify(thisUser.roles));
            sessionStorage.setItem("groups",JSON.stringify(thisUser.groups));
            sessionStorage.setItem("allData",data);

            // send user to dashboard
            this.router.navigateByUrl('/dashboards');
          }
        }
      )
  }

  createAccount(){
    this.router.navigateByUrl('/create-account');
  }
}

