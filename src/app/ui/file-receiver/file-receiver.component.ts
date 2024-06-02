import { ApiService } from '@/app/services/api.service';
import { CookieService } from '@/app/services/cookie.service';
import { FilesService } from '@/app/services/files.service';
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

  constructor(private cookieService: CookieService, private apiService: ApiService, private router: Router, private filesService: FilesService) {}

  public fileQueue = new DataTransfer();
  public files = Array.from(this.fileQueue.files);

  updateFiles(){
    this.files = Array.from(this.fileQueue.files);
  }

  onDragover(event:DragEvent){
    event.stopPropagation();
    event.preventDefault();
  }
  onDrop(event:DragEvent){
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer?.files;
    if(!files) return;
    for (let i = 0; i < files.length; i++) {
      this.fileQueue.items.add(files[i]);
    }
    this.updateFiles();
  }

  onChange(event: Event){
    const token = this.cookieService.getCookie("token");
    if (!token) {this.router.navigate(["/"]); return;}

    const files = (event.target as HTMLInputElement).files;
    console.log(files)

    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      this.fileQueue.items.add(files[i]);
    }
  }

  onSend(){
    const token = this.cookieService.getCookie("token");
    if (!token) {this.router.navigate(["/"]); return;}

    for (let i = 0; i < this.fileQueue.files.length; i++) {
      this.apiService.toPostFiles(token,this.roomId,this.fileQueue.files[i])
      .subscribe(
        (response: any)=>{
          console.log(response);
          this.filesService.addFile(response);
        },
        (error: HttpErrorResponse)=>{
          console.log(error);
        }
      )
    }

    this.fileQueue = new DataTransfer();
    this.updateFiles();
  }
}
