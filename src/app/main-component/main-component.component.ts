import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NameService } from '../service/name.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialogComponent/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { SigningComponent } from '../signing/signing.component';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})

export class MainComponentComponent implements OnInit {
  form: FormGroup;
  name = '';
  surname = '';
  email = '';
  phoneNumber = '';
  putData = {};
  nameSurnameObject = {};
  creditCards = [];
  addingCreditCard = false;
  id: number;
  oldPassword = '';
  newPassword = '';
  changePasswordButton = false;
  urlGetUser = 'http://localhost:8000/api/users/me';
  urlUpdateUser = 'http://localhost:8000/api/users/update';
  urlSaveCardToUser = 'http://localhost:8000/creditCard/save';
  urlToDeleteCard = 'http://localhost:8000/creditCard/delete';
  urlToChangePassword = 'http://localhost:8000/api/users/changePassword';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: CookieService,
    private nameService: NameService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    this.gettingUser();
  }

  gettingUser() {
    this.http.get(this.urlGetUser,
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')
        }
      }).subscribe(data => {
        console.log(data);
        this.changingValue(data);
        this.changeData(data);
        this.creditCards = data.card;
        sessionStorage.setItem('id', data.id);
      }, error => console.log(error));
  }

  changingValue(data) {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
  }

  updateUser() {
    this.putData = {
      id: this.id,
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email
    };
    this.http.put(this.urlUpdateUser, this.putData, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      console.log(data);
      this.changingValue(data);
      alert('Your changes were saved!');
      this.changeData(data);
    }, error => { console.log(error); alert('Something goes wrong. Please relogin'); });
  }

  changeData(data) {
    this.nameSurnameObject = {
      name: this.name,
      surname: this.surname
    };
    sessionStorage.setItem('nameSurname', JSON.stringify(this.nameSurnameObject));
    this.nameService.changeMessage(this.nameSurnameObject);
  }

  goToCreditCards() {
    this.router.navigate(['/profile/credit-cards']);
  }

  openCloseFormToAddCard() {
    this.addingCreditCard = !this.addingCreditCard;
  }

  saveCreditCardToDB(cardNameIn) {
    const idIn = parseInt(sessionStorage.getItem('id'));
    console.log(cardNameIn);
    let creditCardObject: object;
    creditCardObject = {
      userId: idIn,
      nameOfCard: cardNameIn
    };
    this.http.post(this.urlSaveCardToUser, creditCardObject, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }
    ).subscribe(data => {
      this.creditCards.push(data);
      this.addingCreditCard = false; alert('Your card was saved!');
    }, error => console.log(error));

  }

  deleteCreditCard(idIn) {
    console.log(this.creditCards);
    //this.creditCards = this.creditCards.filter(t => t !==  );
    this.http.delete(this.urlToDeleteCard + '/' + idIn, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }
    ).subscribe(data => {
      for (let i = 0; i < this.creditCards.length; i++) {
        if (this.creditCards[i].id === idIn) {
          this.creditCards.splice(i, 1);
        }
      }
    }, error => {
      if (error.status === 403) {
        alert('You do not have enough rights to delete!');
      }
    });
  }

  openDialog(idIn): any {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {

      data: {
        container: 'delete',
        button: 'Delete',
        mainMessage: 'Do you really want to'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log(`Dialog result: ${result.data}`);
      if (result.data) {
        this.deleteCreditCard(idIn);
      }
    });
  }

  openWindow() {

    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {

      data: {
        container: 'update information',
        button: 'Update',
        mainMessage: 'Would you like to'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log(`Dialog result: ${result.data}`);
      if (result.data) {
        this.updateUser();
      }
    });
  }

  openCloseFormToChangePassword() {
    this.changePasswordButton = !this.changePasswordButton;
  }

  changePassword() {
    const newObject = {
      email: this.email,
      password: this.oldPassword,
      newPassword: this.newPassword
    };
    this.http.put(this.urlToChangePassword, newObject, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      this.changePasswordButton = false;
      this.convertData(data.tokenType, data.accessToken);
      this.oldPassword = ''; this.newPassword = '';
    }, error => { alert(error.error.message); this.oldPassword = ''; this.newPassword = ''; });

  }

  convertData(tokenType: string, accessToken: string) {
    const token = tokenType + ' ' + accessToken;
    sessionStorage.setItem('token', token);
    //this.cookies.set('token', this.token);
    //return this.token;
  }

  openDialogToChangePassword() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {

      data: {
        container: 'change password',
        button: 'Change',
        mainMessage: 'Would you like to'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log(`Dialog result: ${result.data}`);
      if (result.data) {
        this.changePassword();
      }
    });
  }
}
