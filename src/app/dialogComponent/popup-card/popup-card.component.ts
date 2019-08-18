import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit {
  cardObject = {};
  // url = 'http://localhost:8000/api/chargeController/getOneCardByCustomer/';
  url = 'https://tickets-app-server.herokuapp.com/api/chargeController/getOneCardByCustomer/';
  constructor(private dialogRef: MatDialogRef<PopupCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCardByCardId();
  }

  close() {
    this.dialogRef.close({});
  }

  getCardByCardId() {
    this.http.get(this.url + '' + this.data.userId + '/' + this.data.cardId, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
        this.cardObject = data;
      console.log(this.cardObject);
    }, error => console.log(error));
  }

}
