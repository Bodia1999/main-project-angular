import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-credit-card',
  templateUrl: './create-credit-card.component.html',
  styleUrls: ['./create-credit-card.component.css']
})
export class CreateCreditCardComponent implements OnInit {
  urlSaveCardToUser = 'http://localhost:8000/creditCard/save';
  constructor(private dialogRef: MatDialogRef<CreateCreditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) { }

  ngOnInit() {
  }

  submit(firstNameIn, lastNameIn, addressIn, cityIn, countryIn, zipIn, nameOfCardIn, cardHolderNameIn, creditCardNumberIn,  monthIn, yearIn,
    cvcIn) {
      const newMonth = monthIn.substring(0, 2);
      const body = {
        firstName: firstNameIn,
        lastName: lastNameIn,
        address: addressIn,
        city: cityIn,
        country: countryIn,
        zip: zipIn,
        name: cardHolderNameIn,
        nameOfCreditCard: nameOfCardIn,
        number: creditCardNumberIn,
        expiryMonth: newMonth,
        expiryYear: yearIn,
        cvc: cvcIn,
        customerStripeId: sessionStorage.getItem('cusId')
      };
      console.log(body);
      this.http.post(this.urlSaveCardToUser + '/' + sessionStorage.getItem('id'), body, {
        headers: {
          'Authorization': sessionStorage.getItem('token')
        },
        responseType: 'text'
      }).subscribe(data => {
        console.log(data);
        this.dialogRef.close({
          data: JSON.parse(data),
          addingCreditCard: false
           });
      }, error => {
        alert(JSON.parse(error.error).message);
        console.log(JSON.parse(error.error).message);
      });
    }


}
