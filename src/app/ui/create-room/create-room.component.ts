import { Component } from '@angular/core';
import { InputAuthComponent } from '../input-auth/input-auth.component';
import { ButtonAuthComponent } from '../button-auth/button-auth.component';

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

}
