import { CreateRoomComponent } from '@/app/ui/create-room/create-room.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const typesFiles = ["video", "pdf", "xlsx", "image"] as const;
type typeFiles = typeof typesFiles[number];

interface file {
  id: string;
  name: string;
  type: typeFiles;
  countDownload: string;
}

const files: Array<file> = [
  {
    id: "auwgfao832o",
    name: "Как Сергей спит",
    type: "video",
    countDownload: "0"
  }, 
  {
    id: "srbr42ge23f",
    name: "Резюме",
    type: "pdf",
    countDownload: "3"
  },
  {
    id: "gseh5j54w",
    name: "О глобальной слежке США",
    type: "video",
    countDownload: "0"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
  {
    id: "gseh5j54w",
    name: "О глобальной слежке США",
    type: "video",
    countDownload: "0"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
  {
    id: "gseh5j54w",
    name: "О глобальной слежке США",
    type: "video",
    countDownload: "0"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
  {
    id: "segsehwe2ewr44",
    name: "Не смотрим",
    type: "image",
    countDownload: "32"
  },
]

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    CreateRoomComponent
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{

  public id !: string|null;

  public types = typesFiles;
  public files = files;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    });
  }

}
