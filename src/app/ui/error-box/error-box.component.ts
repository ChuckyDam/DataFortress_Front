import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      if (newValue === "") return;

      let erBox: HTMLDivElement = this.errorBox?.nativeElement;
      if (erBox){
        erBox.style.visibility = 'visible';
        sleep(0)
        .then(async()=>{
          this.active = true;
          await sleep(3000);
        })
        .then(async()=>{
          this.active = false;
          await sleep(500);
        })
        .then(()=>{
          erBox.style.visibility = 'hidden';
          this.errorService.closeError();
        })
      }
      
    }

  }

}
