import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {
  postData = {};
  url = 'http://localhost:8000/api/auth/signin';
  token = '';
  checker = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: CookieService,
    private data: DataService
  ) { }


  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      console.log('something important');
      this.router.navigate(['/profile']);
    }
    this.data.currentMessage.subscribe(message => this.checker = message);
  }

  ngOnChange() {

  }
  login(emailIn: string, passIn: string) {
    console.log(emailIn + ' ' + passIn);
    this.postData = {
      email: emailIn,
      password: passIn
    };
    this.http.post(this.url, this.postData).subscribe(
      data => {
        this.data.changeMessage(false);
        this.convertData(data.tokenType, data.accessToken);
        this.checker = true;
        console.log(this.checker);
        this.router.navigate(['/profile']);
      },
      error => {

        alert(error.error.message);

        console.log(error);
      });

    //console.log(this.checker);
  }

  convertData(tokenType: string, accessToken: string) {
    this.token = tokenType + ' ' + accessToken;
    sessionStorage.setItem('token', this.token);
    //this.cookies.set('token', this.token);
    //return this.token;
  }

}
