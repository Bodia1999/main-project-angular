import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SigningComponent } from '../signing/signing.component';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookies: CookieService,
    private http: HttpClient,
    private data: DataService
    ) { }

  message: string;
  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/profile/my-info']);
    }
  }

  showMyInfo() {
    this.router.navigate(['my-info'], { relativeTo: this.route} );
  }

  showOrders() {
    this.router.navigate(['orders'], { relativeTo: this.route });
  }

  
}
