import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    CommonModule
  ],
  templateUrl: './search-rooms.component.html',
  styleUrl: './search-rooms.component.scss'
})
export class SearchRoomsComponent {

  public data: Room[] = data;

  public searchText = '';

  onClick(id:string) {
    console.log(id);
  }
  filteredData() {
    return this.data.filter(data => {
      return data.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    });
  }

}
