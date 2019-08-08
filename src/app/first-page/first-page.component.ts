import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  url = 'http://localhost:8000/ticketEvolution/get';
  mainArray = [];
  firstSection = [];
  secondSection = [];
  thirdSection = [];
  fourthSection = [];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.parceInfo();
  }

  parceInfo() {
    this.mainArray.push(this.firstSection, this.secondSection, this.thirdSection, this.fourthSection);
    for (let i = 0; i < this.mainArray.length; i++) {
      this.getEvents(i + 1);
    }
  }

  getEvents(numberOfPage: number) {
    const body = {
      cityState: '',
      page: numberOfPage,
      perPage: 4
    };
    this.http.post(this.url, body, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(data => {
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
    console.log(value);
  }
}
