import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

const data = [
  {
    id: "0",
    name: "Room 404"
  },
  {
    id: "1",
    name: "Room 405"
  },
  {
    id: "1asga",
    name: "Стас Ай Как Просто"
  },
  {
    id: "fawga233g2g4weg",
    name: "Тут данные"
  },
  {
    id: "1g4goqasg2g34a",
    name: "Сергей дай денег"
  },
  {
    id: "4",
    name: "Abc"
  },
  {
    id: "5",
    name: "Fuck"
  },
  {
    id: "6",
    name: "Doing"
  },
  {
    id: "4",
    name: "Abc"
  },
  {
    id: "5",
    name: "Fuck"
  },
  {
    id: "6",
    name: "Doing"
  },
]

interface Room {
  id: string;
  name: string;
}

@Component({
  selector: 'app-search-rooms',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './search-rooms.component.html',
  styleUrl: './search-rooms.component.scss'
})
export class SearchRoomsComponent {

  constructor(private router: Router) {}

  public data: Room[] = data;

  public searchText = '';

  filteredData() {
    return this.data.filter(data => {
      return data.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    });
  }

  addClick(){
    this.router.navigate(["/rooms/addroom"])
  }

}
