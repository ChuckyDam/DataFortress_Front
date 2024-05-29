import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Room {
  id: string;
  name: string;
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
  setRooms(rooms: Room[]){
    this._rooms.next([...rooms]);
  }

}