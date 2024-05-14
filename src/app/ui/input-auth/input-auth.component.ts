
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-auth',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule
  ],
  templateUrl: './input-auth.component.html',
  styleUrl: './input-auth.component.scss'
})
export class InputAuthComponent {

  @Input() value:string = ""; 

  

}
