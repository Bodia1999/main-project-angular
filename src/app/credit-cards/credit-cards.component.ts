import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PopupCardComponent } from '../dialogComponent/popup-card/popup-card.component';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  urlToGetAllCards = 'http://localhost:8000/api/chargeController/getAllCardsByCustomer/';
  cardData;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getAllCards();
  }

  getAllCards() {
    const body = {
      cardId: null
    };
    this.http.get(this.urlToGetAllCards + '' + sessionStorage.getItem('cusId'), {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      this.cardData = data;
      console.log(this.cardData);

    }, error => {
      console.log(error);
    });
  }

}
