import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchRoomsComponent } from 'src/app/ui/search-rooms/search-rooms.component';
import { CookieService } from "@/app/services/cookie.service"

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchRoomsComponent
  ],
  host: {
    class:'Rooms'
  },
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit{

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {

    if(!this.cookieService.getCookie("token")){
      this.router.navigate(["/"]);
    }

    console.log(this.cookieService.getCookie("token"));
  }

}
