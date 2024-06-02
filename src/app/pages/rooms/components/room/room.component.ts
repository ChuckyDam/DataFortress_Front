import { ApiService } from '@/app/services/api.service';
import { CookieService } from '@/app/services/cookie.service';
import { ErrorService } from '@/app/services/error.service';
import { FilesService } from '@/app/services/files.service';
import { RoomService } from '@/app/services/room.service';
import { Room, RoomsService } from '@/app/services/rooms.service';
import { ButtonAuthComponent } from '@/app/ui/button-auth/button-auth.component';
import { CreateRoomComponent } from '@/app/ui/create-room/create-room.component';
import { FileReceiverComponent } from '@/app/ui/file-receiver/file-receiver.component';
import { InputAuthComponent } from '@/app/ui/input-auth/input-auth.component';
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

interface User {
  id: string;
  login: string;
  userName: string;
}

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    CreateRoomComponent,
    ModalWindowComponent,
    FileReceiverComponent,
    InputAuthComponent,
    ButtonAuthComponent
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{

  constructor(private roomService: RoomService, private route: ActivatedRoute, private filesService: FilesService, private apiService: ApiService, private cookieService: CookieService, private router: Router, private errorService: ErrorService, private roomsService: RoomsService) {
    this.subData = this.filesService.files.subscribe(files => {
      this.files = files;
    });

    this.subRole = this.roomService.role.subscribe(role => {
      this.role = role;
    })
  }

  public email = "";

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
  ModalAddUser(){
    this.typeModal = "addUser";
  }
  ModalUsers(){
    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.typeModal = "users";

    this.apiService.toGetUsers(token, this.id)
    .subscribe(
      (response: any)=>{
        this.users = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
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
  backSettingModal(){
    this.typeModal = "settings";
  }
  onAddUser(event: Event){
    event.preventDefault();
    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.apiService.toAddUser(token, this.id, this.email)
    .subscribe(
      (response)=>{
        this.backSettingModal();
        console.log(response);

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
      }
    )

    console.log(this.email);
  }
  onDelUser(userId: string){
    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.users = this.users.filter((user)=>user.id !== userId);
    this.apiService.toKickUser(token,this.id,userId)
    .subscribe(
      (response)=>{
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }
  getURLformat(format: string){
    const images = new Map([
      ["video", "../../../../../assets/images/types/videocam.svg"],
      ["pdf", "../../../../../assets/images/types/picture_as_pdf.svg"],
      ["xlsx", "../../../../../assets/images/types/table_chart.svg"],
      ["image", "../../../../../assets/images/types/photo.svg"],
      ["audio", "../../../../../assets/images/types/audio-svgrepo-com.svg"]
    ]);

    if(/^image\/.+$/.test(format)){
      return images.get("image");
    }
    if(/^video\/.+$/.test(format)){
      return images.get("video");
    }
    if(/^audio\/.+$/.test(format)){
      return images.get("audio");
    }

    return "../../../../../assets/images/types/files-svgrepo-com.svg";
  }
  leaveRoom(){
    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.router.navigate(["rooms"]);
    this.roomsService.removeRoom(this.id);
    this.apiService.toLeaveRoom(token, this.id)
    .subscribe(
    (response)=>{
      console.log(response);
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
    })
  }

  public users : User[] = [];

  public id !: string;
  public name!: string;

  public isLoading:boolean = false;

  public files : File[] = []
  public subData!: Subscription;

  public role: string = '2';
  public subRole!: Subscription;

  public subFiles : Subscription|undefined;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(this.subFiles) {this.subFiles.unsubscribe();}
      
      this.users = [];

      this.id = `${params.get("id")?.split("?=")[0]}`;
      if(this.id === "addroom"){
        return;
      }

      this.name = `${params.get("id")?.split("?=")[1]}`;
      this.modalSetting = false;

      this.filesService.setFiles([]);
      this.getFiles();
    });
  }

  protected getFiles(){
    this.isLoading = true;
    this.filesService.setFiles([]);


    const token = this.cookieService.getCookie("token");
    if(!token){
      this.router.navigate(["/"]);
      return;
    }

    this.subFiles = this.apiService.toGetFiles(token, this.id)
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
      }
    )

    this.apiService.toGetUsers(token, this.id)
    .subscribe(
      (response: any)=>{
        const users = response.filter((user: User)=>user.id)
        this.users = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
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
          const fileName = this.filesService.getFileName(fileId);
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

  ngOnDestroy(): void {
    this.subData.unsubscribe();
    this.subRole.unsubscribe();
    if(this.subFiles) {this.subFiles.unsubscribe();}
  }

}
