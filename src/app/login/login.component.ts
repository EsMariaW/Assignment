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

  submit(){
    let user = {username: this.username, password: this.password};
    this.httpClient.post("http://localhost:3000/api/login", user,httpOptions)
      .subscribe(
        (data: any)=> {  // data from res.send()
          if(data.valid){   // user has logged in
            // store their details in sessionStorage
            //    except for .password and .valid
            sessionStorage.setItem("username", data.username.toString());
            sessionStorage.setItem("email", data.email.toString());
            sessionStorage.setItem("id", data.id.toString());
            sessionStorage.setItem("roles", JSON.stringify(data.roles));
            sessionStorage.setItem("groups",JSON.stringify(data.groups));

            // send user to home-page 
            this.router.navigateByUrl('/home-page');

          } else {
            alert("Please try again");
          }
        }
      )
  }
}

