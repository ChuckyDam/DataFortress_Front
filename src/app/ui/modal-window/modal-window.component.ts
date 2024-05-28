import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule
  ],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent implements OnChanges{

  @ViewChild('Modal') modal: ElementRef | undefined;

  @Input() isModalOpen:boolean = false;
  @Output() openModal = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if(changes["isModalOpen"]){
      let modal: HTMLDivElement = this.modal?.nativeElement;
      if (modal){
        if(changes["isModalOpen"].currentValue){
          modal.style.display = 'flex';
          sleep(0)
          .then(()=>{
            modal.classList.add("active");
          })
        }else{
          modal.classList.remove("active");
          sleep(300)
          .then(()=>{
            modal.style.display = 'none';
          })
        }
      }
      console.log(this.isModalOpen);
    }
  }

  onClose(event: Event){
    if (event.target === event.currentTarget){
      this.isModalOpen = false;
      this.openModal.emit(false);
    }
  }

}
