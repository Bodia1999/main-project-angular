import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {

  cancelButton = false;
  deleteButton = true;
  constructor(private dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close({ data: this.cancelButton });
  }

  delete() {
    this.dialogRef.close({ data: this.deleteButton });
  }

}
