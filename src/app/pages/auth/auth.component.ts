import { CookieService } from '@/app/services/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  host: {
      class:'Auth'
  },
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent{

}
