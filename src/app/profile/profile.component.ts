import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SigningComponent } from '../signing/signing.component';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { TicketService } from '../service/ticketService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ticketVariable: boolean;
  buttonVariable: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookies: CookieService,
    private http: HttpClient,
    private data: DataService,
    private ticketService: TicketService
  ) { }

  message: string;
  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/profile/my-info']);
    }
    this.ticketService.currentMessage.subscribe(message => {
      this.ticketVariable = message.button;
      this.buttonVariable = message.container;
    });
  }

  showMyInfo() {
    this.router.navigate(['my-info'], { relativeTo: this.route });
  }

  showOrders() {
    this.router.navigate(['orders'], { relativeTo: this.route });
  }

  showTickets() {
    const object = {
      button: true,
      container: this.buttonVariable
    };
    this.ticketService.changeMessage(object);
  }

  showTransactions() {
    const object = {
      button: false,
      container: this.buttonVariable
    };
    this.ticketService.changeMessage(object);
  }


}
