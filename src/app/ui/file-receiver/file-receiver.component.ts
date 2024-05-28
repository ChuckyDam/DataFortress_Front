import { ApiService } from '@/app/services/api.service';
import { CookieService } from '@/app/services/cookie.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-receiver',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './file-receiver.component.html',
  styleUrl: './file-receiver.component.scss'
})
export class FileReceiverComponent {

  @ViewChild('Drop_zone') modal: ElementRef | undefined;
  @Input() roomId!: string;

  constructor(private cookieService: CookieService, private apiService: ApiService, private router: Router) {}

  fileQueue = new DataTransfer();

  onDragover(event:DragEvent){
    event.stopPropagation();
    event.preventDefault();
  }
  onDrop(event:DragEvent){
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer?.files[0];
    if(!files) return;
    // for (let i = 0; i < files.length; i++) {
    //   this.fileQueue.items.add(files[i]);
    // }

    console.log(this.fileQueue);
  }
  onChange(event: Event){
    const token = this.cookieService.getCookie("token");
    if (!token) {this.router.navigate(["/"]); return;}

    const files = (event.target as HTMLInputElement).files;
    console.log(files)

    if (!files) return;

    this.apiService.toPostFiles(token,this.roomId, files[0])
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
  onSend(){
    const token = this.cookieService.getCookie("token");
    if (!token) {this.router.navigate(["/"]); return;}

    this.apiService.toPostFiles(token,this.roomId,this.fileQueue.files[0])
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )

  }
}
