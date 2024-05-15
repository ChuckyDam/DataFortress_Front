
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChildProps {
  valueInp: string;
  id: string;
}

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
export class InputAuthComponent implements ChildProps{

  @Input() valueInp:string = ""; 
  @Output() valueInpChange = new EventEmitter<string>();

  @Input() type:string = "text"; // тут типы тайпа
  
  @Input() placeHolder:string = "";

  @Input() name:string = "";
  @Input() id:string = "";

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueInp = value;
    this.valueInpChange.emit(value);
  }

}
