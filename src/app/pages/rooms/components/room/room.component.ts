import { ApiService } from '@/app/services/api.service';
import { FilesService } from '@/app/services/files.service';
import { CreateRoomComponent } from '@/app/ui/create-room/create-room.component';
import { FileReceiverComponent } from '@/app/ui/file-receiver/file-receiver.component';
import { ModalWindowComponent } from '@/app/ui/modal-window/modal-window.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  // {
  //   id: "srbr42ge23f",
  //   name: "Резюме",
  //   type: "pdf",
  //   countDownload: "3"
  // },
  // {
  //   id: "gseh5j54w",
  //   name: "О глобальной слежке США",
  //   type: "video",
  //   countDownload: "0"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
  // {
  //   id: "gseh5j54w",
  //   name: "О глобальной слежке США",
  //   type: "video",
  //   countDownload: "0"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
  // {
  //   id: "gseh5j54w",
  //   name: "О глобальной слежке США",
  //   type: "video",
  //   countDownload: "0"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
  // {
  //   id: "segsehwe2ewr44",
  //   name: "Не смотрим",
  //   type: "image",
  //   countDownload: "32"
  // },
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
  public typeModal = "settings";
  public modalSetting = false;
  modalSettings(state: boolean){
    this.modalSetting = state;
  }
  openModalSettings(){
    this.typeModal = "settings";
    this.modalSetting = true;
  }
  openModalAddFile(){
    this.typeModal = "addFile";
    this.modalSetting = true;
  }

  public id !: string;

  public types = typesFiles;
  public images = new Map([
    ["video", "../../../../../assets/images/types/videocam.svg"],
    ["pdf", "../../../../../assets/images/types/picture_as_pdf.svg"],
    ["xlsx", "../../../../../assets/images/types/table_chart.svg"],
    ["image", "../../../../../assets/images/types/photo.svg"]
  ]);

  public files = files
  
  constructor(private route: ActivatedRoute, private filesService: FilesService, private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = `${params.get("id")}`;

      this.modalSetting = false;
    });

    this.apiService
  }

}
