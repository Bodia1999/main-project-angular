import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-signing-up',
  templateUrl: './signing-up.component.html',
  styleUrls: ['./signing-up.component.css']
})
export class SigningUpComponent implements OnInit {

  postData = {};
  email = '';
  token = '';
  url = 'http://localhost:8000/api/auth/signup';
  urlToUpdateCustomer = 'http://localhost:8000/api/users/update';
  urlToCreateCustomerStripe = 'http://localhost:8000/api/chargeController/customers';
  urlToLogin = 'http://localhost:8000/api/auth/signin';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  ngOnInit() {
  }

  register(emailIn, passwordIn, nameIn, surnameIn, phoneNumberIn) {
    let id;
    this.email = emailIn;
    this.postData = {
      email: emailIn,
      password: passwordIn,
      name: nameIn,
      surname: surnameIn,
      phoneNumber: phoneNumberIn
    };
    this.http.post(this.url, this.postData)
      .subscribe(data => {
        id = data;
        this.postData = {
          email: emailIn,
          password: passwordIn
        };
        /*this.http.post(this.urlToLogin, this.postData).subscribe(
          dataIn => {
            this.token = dataIn.tokenType + ' ' + dataIn.accessToken;
            this.creatingNumberInStripe(this.email, this.token, id);
          },
          error => {
            console.log(error);
          });*/
        this.router.navigate(['/sign-in']);
      }, error => {
        console.log(error);
        if (error.status === 409) {
          alert('This email already in use!');
        } else {
          alert('Check your input data');
        }
      });

  }

  creatingNumberInStripe(emailIn, token, id) {
    console.log(emailIn + '  ' + token + '  ' + id);
    console.log('From creating' + this.token);
    let body = {
      email: emailIn
    };
    this.http.post(this.urlToCreateCustomerStripe, body, {
      headers: {
        'Authorization': token
      },
      responseType: 'text'
    }).subscribe(data => {
      console.log('Stripe: ' + data);
      this.updateUser(data, token, id);
      console.log(data);
    }, error => console.log(error));
  }

  updateUser(customerId, token, idIn) {
    console.log('From updating' + this.token);
    let bodyUpdate = {
      id: idIn,
      stripeCustomerId: customerId
    };
    console.log(bodyUpdate);
    console.log('token ' + token);
    this.http.put(this.urlToUpdateCustomer, bodyUpdate, {
      headers: {
        'Authorization': token
      }
    }).subscribe(data => console.log(data), error => console.log(error));
  }

}
