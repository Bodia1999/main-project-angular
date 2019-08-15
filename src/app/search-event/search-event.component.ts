import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})
export class SearchEventComponent implements OnInit {

  url = 'http://localhost:8000/ticketEvolution/get';
  mainArray = [];
  ifVisible = false;
  paginationVisibility = true;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEvents();
    console.log(sessionStorage.getItem('categoryId'));
  }

  ngOnDestroy() {


  }

  getEvents() {
    let idOfCategory = '';
    if (sessionStorage.getItem('categoryId') !== null) {
      idOfCategory = sessionStorage.getItem('categoryId');
    }
    const body = {
      cityState: '',
      q: sessionStorage.getItem('q'),
      categoryId: idOfCategory,
      page: 1,
      perPage: 1000
    };
    this.http.post(this.url, body
    ).subscribe(data => {
      this.mainArray = data.events;
      if (this.mainArray.length === 0) {
        this.ifVisible = true;
        this.paginationVisibility = false;
      }
      if (this.mainArray.length <= 24) {
        this.paginationVisibility = false;
      }
    }, error => {
      alert(error.error.message);
    });
  }

  click(value) {
    sessionStorage.setItem('eventId', value);
    this.router.navigate(['/tickets']);
  }

  return() {
    this.router.navigate(['/']);
  }
  onFloatClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
