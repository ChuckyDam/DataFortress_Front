import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface File {
    id: string;
    name: string;
    room_id: string;
    format: string;
    downloads: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private _files = new BehaviorSubject<File[]>([]);
  public files = this._files.asObservable();

  constructor() { }

  setFiles(items: File[]){
    this._files.next([...items]);
  }
}