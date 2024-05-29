import { ApiService } from '@/app/services/api.service';
import { CookieService } from '@/app/services/cookie.service';
import { ErrorService } from '@/app/services/error.service';
import { FilesService } from '@/app/services/files.service';
import { Room, RoomsService } from '@/app/services/rooms.service';
import { CreateRoomComponent } from '@/app/ui/create-room/create-room.component';
import { FileReceiverComponent } from '@/app/ui/file-receiver/file-receiver.component';
import { ModalWindowComponent } from '@/app/ui/modal-window/modal-window.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

const typesFiles = ["video", "pdf", "xlsx", "image"] as const;
type typeFiles = typeof typesFiles[number];

interface File {
  id: string;
  name: string;
  room_id: string;
  format: string;
  downloads: number;
}

const files: Array<File> = [
  {
    id: "auwgfao832o",
    name: "Как Сергей спит",
    room_id: "qqq",
    format: "video",
    downloads: 0
  },
]

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    CreateRoomComponent,
    ModalWindowComponent,
    FileReceiverComponent
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{

  constructor(private route: ActivatedRoute, private filesService: FilesService, private apiService: ApiService, private cookieService: CookieService, private router: Router, private errorService: ErrorService, private roomsService: RoomsService) {
    this.subData = this.filesService.files.subscribe(files => {
      this.files = files;
    });
  }

  public typeModal = "settings";
  public modalSetting = false;
  modalSettings(state: boolean) {
    this.modalSetting = state;
  }
  openModalSettings() {
    this.typeModal = "settings";
    this.modalSetting = true;
  }
  openModalAddFile() {
    this.typeModal = "addFile";
    this.modalSetting = true;
  }
  ModalSure(){
    this.typeModal = "sure";
  }
  onDelRoom(){
    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.modalSetting = false;
    let rooms: Room[] = [];
    this.roomsService.rooms.forEach((value)=>{
      rooms = value.filter((room)=>room.id!==this.id);
    })
    this.roomsService.setRooms(rooms);
    this.router.navigate(["/rooms"]);

    this.apiService.toDeleteRoom(token, this.id)
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        console.error(error);

          switch (error.status) {
            case 401:
              this.router.navigate(["/"]);
              break;
            default:
              this.errorService.setError("Ошибка подключения");
              break;
          }

          this.router.navigate(["/"]);
        }
      )
  }

  public id !: string;
  public name!: string;

  public isLoading:boolean = false;

  public images = new Map([
    ["video/quicktime", "../../../../../assets/images/types/videocam.svg"],
    ["pdf", "../../../../../assets/images/types/picture_as_pdf.svg"],
    ["xlsx", "../../../../../assets/images/types/table_chart.svg"],
    ["image/jpeg", "../../../../../assets/images/types/photo.svg"]
  ]);

  public files : File[] = []
  public subData!: Subscription;
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const token = this.cookieService.getCookie("token");
      if(!token){
        this.router.navigate(["/"]);
        return;
      }

      this.id = `${params.get("id")?.split("?=")[0]}`;
      this.name = `${params.get("id")?.split("?=")[1]}`;
      this.modalSetting = false;

      this.filesService.setFiles([]);
      this.isLoading = true;
      this.apiService.toGetFiles(token, this.id)
      .subscribe(
        (response)=>{
          this.isLoading = false;
          this.filesService.setFiles(response);
        },
        (error: HttpErrorResponse)=>{
          console.error(error);
  
          switch(error.status){
            case 401:
              this.router.navigate(["/"]);
              break;
            default:
              this.errorService.setError("Ошибка подключения");
              break;
          }
  
          this.router.navigate(["/"]);
        }
      )
    });
  }

  downloadFile(fileId: string){
    const token = this.cookieService.getCookie("token");

    if (!token) {
      this.router.navigate(["/"]);
      return;
    }

    this.apiService.toGetFile(token, fileId)
      .subscribe(
        (response: HttpResponse<Blob>) => {
          console.log(response.headers);
          const contentDisposition = response.headers.get('content-disposition');
          const fileName = this.getFileNameFromContentDisposition(contentDisposition);
          if (response.body) {
            const blob = new Blob([response.body], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
          else {
            console.error("error download file - empty response body")
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);

          switch (error.status) {
            case 401:
              this.router.navigate(["/"]);
              break;
            default:
              this.errorService.setError("Ошибка подключения");
              break;
          }
        }
      )
  }

  private getFileNameFromContentDisposition(contentDisposition: string | null): string {
    if (!contentDisposition) return 'downloadedFile';

    let fileName = 'downloadedFile';
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
  
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, '');
    }
  
    const filenameStarRegex = /filename\*=UTF-8''([^;\n]*)/;
    const matchesStar = filenameStarRegex.exec(contentDisposition);
  
    if (matchesStar != null && matchesStar[1]) {
      fileName = decodeURIComponent(matchesStar[1]);
    }
  
    return fileName;
  }

}
