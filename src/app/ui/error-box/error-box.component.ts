import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

async function emergence(erBox: HTMLDivElement) {
  erBox.style.visibility = 'visible'
}

@Component({
  selector: 'app-error-box',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.scss'
})
export class ErrorBoxComponent implements OnChanges{

  @ViewChild('errorBox') errorBox: ElementRef | undefined;

  @Input() text: string = '';
  active: boolean = false;

  constructor(private errorService: ErrorService) {}
  
  ngOnChanges(changes: SimpleChanges) {

    if (changes["text"]) {
      const newValue = changes["text"].currentValue;
      console.log('Value changed:', newValue);

      let erBox: HTMLDivElement = this.errorBox?.nativeElement;
      if (erBox){
        emergence(erBox)
        .then(()=>{
          this.active = true;
        })
      }
      
    }

  }

}
