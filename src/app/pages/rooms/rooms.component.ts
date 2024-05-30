import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchRoomsComponent } from 'src/app/ui/search-rooms/search-rooms.component';
import { CookieService } from "@/app/services/cookie.service"
import { ApiService } from '@/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '@/app/services/error.service';
import { Subscription } from 'rxjs';
import { Room, RoomsService } from '@/app/services/rooms.service';

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

  public data: Room[] = [];
  public subData!: Subscription;

  constructor(private cookieService: CookieService, private router: Router, private apiService: ApiService, private errorService: ErrorService, private roomsService: RoomsService) {

    this.subData = this.roomsService.rooms.subscribe(rooms => {
      this.data = rooms;
    });

  }

  ngOnInit(): void {

    const token = this.cookieService.getCookie("token");

    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.apiService.toRoomsGet(token).subscribe(
      (response)=>{
        this.roomsService.setRooms(response);
      },
      (error: HttpErrorResponse)=>{
        console.error(error);

        switch(error.status){
          case 409:
            this.errorService.setError("Пользователь не подтверждён");
            break;

          default:
            this.errorService.setError("Ошибка подключения");
            break;
        }

        this.router.navigate(["/"]);
      }
    )

  }

  ngOnDestroy(): void {
    this.subData.unsubscribe();
  }
}
