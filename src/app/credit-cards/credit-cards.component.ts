import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogContentExampleDialogComponent } from '../dialogComponent/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  
}
