import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Room {
  id: string;
  name: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private _rooms = new BehaviorSubject<Room[]>([]);
  public rooms = this._rooms.asObservable();

  constructor() { }

  addNewRoom(item: Room) {
    this._rooms.next([...this._rooms.getValue(), item]);
  }
  removeRoom(id: string) {
    this._rooms.next([...this._rooms.getValue().filter((room)=>room.id !== id)]);
  }
  setRooms(rooms: Room[]){
    this._rooms.next([...rooms]);
  }

}