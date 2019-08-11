import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../service/ticketService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  urlToGetAllOrdersByUserId = 'http://localhost:8000/api/order/getAllById/';
  responseData: any;
  ticketsArray: any;
  ifVisibleTickets = true;
  orders = false;
  constructor(
    private http: HttpClient,
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllOrdersOfCustomer();
    this.ticketService.changeMessage({
      button: true,
      container: true
    });
    this.ticketService.currentMessage.subscribe(message => { this.ifVisibleTickets = message.button });
    console.log(this.ticketsArray);
  }

  ngOnDestroy() {
    this.ticketService.changeMessage({
      button: true,
      container: false
    });
  }

  getAllOrdersOfCustomer() {
    this.http.get(this.urlToGetAllOrdersByUserId + sessionStorage.getItem('id'), {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      console.log(data);
      if (data !== undefined) {
        console.log('here');
        this.responseData = data;
        this.ticketsArray = data;
      }
      if (data === null || this.ticketsArray.length === 0) {
        this.orders = true;
      }
      if (data != null || data !== undefined) {
        for (let ticket of data) {
          if (!ticket.ifRefunded) {
            this.ticketsArray = [];
            this.ticketsArray.push(data);
          }
        }
      }
      console.log(this.ticketsArray);
    }, error => { alert(error.error.message); });
  }

  buyTicket() {
    this.router.navigate(['/']);
  }


}
