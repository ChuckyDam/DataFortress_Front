import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _roleId = new BehaviorSubject<string>('0');
  public role = this._roleId.asObservable();

  constructor() { }

  setRole(roleId: string){
    this._roleId.next(roleId);
  }

}