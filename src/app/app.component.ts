import { Component, OnInit, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './service/data.service';
import { Router } from '@angular/router';
import { NameService } from './service/name.service';
import { MatDialog } from '@angular/material';
import { DialogContentExampleDialogComponent } from './dialogComponent/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'main-project';
  ifVisible: boolean;
  nameSurname = {
    name: 'name',
    surname: 'surname'
  };
  constructor(
    private cookies: CookieService,
    private data: DataService,
    private router: Router,
    private nameSurnameService: NameService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    /*if (sessionStorage.getItem('token')) {
      this.ifVisible = false;
      console.log(this.ifVisible);
    } else {
      this.ifVisible = true;
      console.log(this.ifVisible);
    }*/
    this.data.currentMessage.subscribe(message => this.ifVisible = message);
    this.nameSurnameService.currentMessage.subscribe(message => this.nameSurname = message);
    if (sessionStorage.getItem('token')) {
      this.ifVisible = false;
    }
    this.data.changeMessage(this.ifVisible);
    if (sessionStorage.getItem('nameSurname')) {
      this.nameSurname = JSON.parse(sessionStorage.getItem('nameSurname'));
    }
    console.log(this.nameSurname);

  }


  ngOnChanges() {
    /* if (sessionStorage.getItem('token')) {
       this.ifVisible = false;
       console.log(this.ifVisible);
     } else {
       this.ifVisible = true;
       console.log(this.ifVisible);
     }*/

    this.data.currentMessage.subscribe(message => this.ifVisible = message);
    this.nameSurnameService.currentMessage.subscribe(message => this.nameSurname = message);

  }
  logOut() {
    this.data.changeMessage(true);
    this.cookies.delete('token');
    sessionStorage.removeItem('token');
    sessionStorage.setItem('ifVisible', 'true');
    this.router.navigate(['/']);
  } 

  account() {
    this.router.navigate(['/profile/my-info']);
  }

}
