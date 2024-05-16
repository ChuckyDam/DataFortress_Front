import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchRoomsComponent } from 'src/app/ui/search-rooms/search-rooms.component';

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
export class RoomsComponent {

}
