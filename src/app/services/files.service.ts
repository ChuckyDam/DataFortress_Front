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

  addFile(item: File){
    this._files.next([...this._files.value, item]);
  }
  setFiles(items: File[]){
    this._files.next([...items]);
  }
  getFileName(id: string): string{
    return this._files.value.find(x => x.id == id)!.name;
  }
}