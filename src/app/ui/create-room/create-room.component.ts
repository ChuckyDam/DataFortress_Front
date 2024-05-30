import { Component, EventEmitter, Output } from '@angular/core';
import { InputAuthComponent } from '../input-auth/input-auth.component';
import { ButtonAuthComponent } from '../button-auth/button-auth.component';
import { ApiService } from '@/app/services/api.service';
import { ErrorService } from '@/app/services/error.service';
import { Router } from '@angular/router';
import { CookieService } from '@/app/services/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Room, RoomsService } from '@/app/services/rooms.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [
    InputAuthComponent,
    ButtonAuthComponent
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  public name = "";

  constructor(private apiService: ApiService, private errorService: ErrorService, private router: Router, private cookieService: CookieService, private roomsService: RoomsService) { }

  onSubmit(event: Event) {
    event.preventDefault();

    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.apiService.toCreateRoom(token, this.name).subscribe(
      (room: any)=>{
        this.roomsService.addNewRoom(room)
        this.router.navigate(["/rooms/", room.id + '?=' + this.name]);
      },
      (error: HttpErrorResponse)=>{
        console.log(error)
      }
    )

  }

}
