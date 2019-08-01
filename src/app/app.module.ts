import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { SigningComponent } from './signing/signing.component';
import { HttpClientModule } from '@angular/common/http';
import { SigningUpComponent } from './signing-up/signing-up.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { SettingsComponent } from './settings/settings.component';
import { from } from 'rxjs';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { DataService } from './service/data.service';
import { NameService } from './service/name.service';
import { LetterToUppercasePipe } from './pipes/letter-to-uppercase.pipe';
import { CreatingNamePipe } from './pipes/creating-name.pipe';
import { DialogContentExampleDialogComponent } from './dialogComponent/dialog-content-example-dialog/dialog-content-example-dialog.component';


const appRoutes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'sign-in', component: SigningComponent },
  { path: 'sign-up', component: SigningUpComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'my-info', component: MainComponentComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'credit-cards', component: CreditCardsComponent
      }
    ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    SigningComponent,
    SigningUpComponent,
    ProfileComponent,
    OrdersComponent,
    SettingsComponent,
    CreditCardsComponent,
    FirstPageComponent,
    LetterToUppercasePipe,
    CreatingNamePipe,
    DialogContentExampleDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService, DataService, NameService, LetterToUppercasePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentExampleDialogComponent]

})
export class AppModule { }
export const routingComponents = [
  MainComponentComponent,
  SigningComponent,
  SigningUpComponent,
  ProfileComponent,
  OrdersComponent
];
