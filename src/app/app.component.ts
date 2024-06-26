import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ErrorBoxComponent } from './ui/error-box/error-box.component';
import { Subscription } from 'rxjs';
import { ErrorService } from './services/error.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from './services/cookie.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ErrorBoxComponent,
    HttpClientModule
  ],
  providers: [
    ErrorService,
    ApiService,
    CookieService
  ],
  templateUrl: "./app.component.html",
  styleUrl: './app.component.scss'
})
export class AppComponent {

  text!: string;

  textSubscription: Subscription;

  constructor(private errorService: ErrorService, private cookieService: CookieService, private router: Router) {

    this.textSubscription = this.errorService.text$.subscribe(text => {
      this.text = text
    });

  }

  ngOnInit(): void {

    const token = this.cookieService.getCookie("token");
    if(token){
      this.router.navigate(["/rooms"]);
      return;
    }

  }

  ngOnDestroy(): void {
    this.textSubscription.unsubscribe();
  }
  
}
