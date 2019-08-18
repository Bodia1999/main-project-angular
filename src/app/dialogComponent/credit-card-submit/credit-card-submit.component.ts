import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-credit-card-submit',
  templateUrl: './credit-card-submit.component.html',
  styleUrls: ['./credit-card-submit.component.css']
})
export class CreditCardSubmitComponent implements OnInit {
  error = false;
  ifVisible = false;
  constructor(private dialogRef: MatDialogRef<CreditCardSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    sessionStorage.removeItem('value');
  }

  checkedRadio(value) {
    sessionStorage.setItem('value', value);
    this.ifVisible = false;
  }
  cancel() {
    this.dialogRef.close({ data: sessionStorage.getItem('value'), ifBuy: false });
    sessionStorage.removeItem('value');
  }

  submit(qt) {
    console.log(sessionStorage.getItem('value'));
    if (sessionStorage.getItem('value') === null) {
      this.ifVisible = true;
      //alert('Please choose one card!');
      return;
    }
    if (parseInt(sessionStorage.getItem('quantity')) < qt) {
      this.error = true;
      return;
    }
    this.error = false;
    this.ifVisible = false;
    this.dialogRef.close({ data: sessionStorage.getItem('value'), ifBuy: true, quantity: qt });
    sessionStorage.removeItem('value');
  }

}
