import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signing-up',
  templateUrl: './signing-up.component.html',
  styleUrls: ['./signing-up.component.css']
})
export class SigningUpComponent implements OnInit {
  
  postData = {};
  url = 'http://localhost:8000/api/auth/signup';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  ngOnInit() {
  }

  register(emailIn, passwordIn, nameIn, surnameIn, phoneNumberIn) {
    this.postData = {
      email: emailIn,
      password: passwordIn,
      name: nameIn,
      surname: surnameIn,
      phoneNumber: phoneNumberIn
    };
    this.http.post(this.url, this.postData)
      .subscribe(data => { this.router.navigate(['/sign-in']);
                console.log(data)}, error => { alert('Check your input data'); console.log(error)});

  }

}
