import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
 // url = 'http://localhost:8000/ticketEvolution/get';
  url = 'https://tickets-app-server.herokuapp.com/ticketEvolution/get';
 // urlCategories = 'http://localhost:8000/ticketEvolution/getCategories';
  urlCategories = 'https://tickets-app-server.herokuapp.com/ticketEvolution/getCategories';
  mainArray = [];
  firstSection = [];
  secondSection = [];
  thirdSection = [];
  fourthSection = [];
  categoriesArray: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('categoryId');
    this.parceInfo();
  }

  ngOnDestroy() {

  }
  parceInfo() {
    this.getCategories();
    this.mainArray.push(this.firstSection, this.secondSection, this.thirdSection, this.fourthSection);
    for (let i = 0; i < this.mainArray.length; i++) {
      this.getEvents(i + 1);
    }
  }

  getEvents(numberOfPage: number) {
    const body = {
      cityState: '',
      q: '',
      categoryId: '',
      page: numberOfPage,
      perPage: 10
    };
    this.http.post(this.url, body
    ).subscribe(data => {
      if (numberOfPage === 1) {
        this.firstSection = data.events;
      }
      if (numberOfPage === 2) {
        this.secondSection = data.events;
      }
      if (numberOfPage === 3) {
        this.thirdSection = data.events;
      }
      if (numberOfPage === 4) {
        this.fourthSection = data.events;
      }
    }, error => {
      alert(error.error.message);
    });
  }

  click(value) {
    sessionStorage.setItem('eventId', value);
    this.router.navigate(['/tickets']);
  }

  getCategories() {
    this.http.get(this.urlCategories).subscribe(data => this.categoriesArray = data.categories, error => console.log(error));
  }

  search(categoryId, value) {
    if (categoryId !== undefined) {
      sessionStorage.setItem('categoryId', categoryId);
    }
    sessionStorage.setItem('q', value);
    this.router.navigate(['/searchEvent']);
  }

  onFloatClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
