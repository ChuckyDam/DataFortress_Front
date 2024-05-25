import { Room } from '@/app/services/rooms.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  @Input() data: Room[] = [];

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
