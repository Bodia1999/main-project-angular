import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  urlToGetInfoAboutEvent = 'http://localhost:8000/ticketEvolution/getEvent/';
  ticketsArray = [];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getInfoAboutEvent();
  }

  getInfoAboutEvent() {
    this.http.get(this.urlToGetInfoAboutEvent + sessionStorage.getItem('eventId'), {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
      console.log(data.ticketGroups);
      this.ticketsArray = data.ticketGroups;
    }, error => { alert(error.error.message); });
  }

}
