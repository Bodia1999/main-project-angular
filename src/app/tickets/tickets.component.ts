import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditCardSubmitComponent } from '../dialogComponent/credit-card-submit/credit-card-submit.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  urlToGetInfoAboutEvent = 'http://localhost:8000/ticketEvolution/getEvent/';
  urlToCharge = 'http://localhost:8000/api/chargeController/charge';
  ticketsArray = [];
  ticketObject = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('eventId')) {
      this.router.navigate(['/']);
    }
    this.getInfoAboutEvent();
  }

  getInfoAboutEvent() {
    this.http.get(this.urlToGetInfoAboutEvent + sessionStorage.getItem('eventId')).subscribe(data => {
      console.log(data.ticketGroups);
      this.ticketsArray = data.ticketGroups;
      sessionStorage.setItem('quantity', data.ticketGroups.quantity);
    }, error => { alert(error.error.message); });
  }

  reserve(id) {
    console.log(id);
  }

  buy(id, sourceIn, quantity) {
    if (sourceIn === null) {
      return;
    }
    const newObject = {
      userId: sessionStorage.getItem('id'),
      source: sourceIn
    };
    console.log(newObject);
    this.http.post(this.urlToCharge + '/' + id + '/' + quantity, newObject, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      console.log(data);
      this.router.navigate(['/profile/orders']);
    },
      error => { alert(error.error.message); });
    console.log(id);
  }

  openSubmittingCard(id, ticketQuantity) {
    if (sessionStorage.getItem('token') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    sessionStorage.setItem('quantity', ticketQuantity);
    let newArray = [];
    newArray = JSON.parse(sessionStorage.getItem('creditCards'));
    const dialogRef = this.dialog.open(CreditCardSubmitComponent, {

      data: {
        container: newArray
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        return;
      }
      if (result.ifBuy) {
        this.buy(id, result.data, ticketQuantity);
      }
      console.log(result.data);
      console.log(`Dialog result: ${result.data}`);
    });
  }

  onFloatClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
