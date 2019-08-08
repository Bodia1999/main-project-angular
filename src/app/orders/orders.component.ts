import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  urlToGetAllOrdersByUserId = 'http://localhost:8000/api/order/getAllById/';
  responseData: any;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllOrdersOfCustomer();
  }

  getAllOrdersOfCustomer() {
    this.http.get(this.urlToGetAllOrdersByUserId + sessionStorage.getItem('id'), {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => { console.log(data);
      if (data !== undefined) {
        this.responseData = data;
       }
    }, error => { alert(error.error.message); });
  }

}
