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
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  username = "";
  email = "";
  id = "";
  password = "";

  constructor(private router:Router, private httpClient: HttpClient){}

  createAccount(){
    let newUser = {
      username: this.username, 
      email: this.email,
      id: this.id,
      password: this.password}

      this.httpClient.post("http://localhost:3000/createAccount", newUser,httpOptions)
      .subscribe(
        (data: any)=> {  // data from res.send()
          if(data){   // user successfully added
            alert("Successfully added");
            this.router.navigateByUrl('/login');
          } else {
            alert("Cannot add: username already exists")
          }
        }
      )
  }
  
  returnToLoginPage(){
    this.router.navigateByUrl('/login');
  }
}

