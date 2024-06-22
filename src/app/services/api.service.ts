import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';

export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface RegistRequestBody extends LoginRequestBody {
  userName: string;
}

export interface VerifRequestBody {
  login: string;
  code: string;
}

export interface CreateRoomRequestBody {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://localhost:7071'
  expires = new Date(Date.now() + 1000 * 60 * 1488);

  constructor(private http: HttpClient) { }

  toLogPost(body: LoginRequestBody): Observable<any> {
    const endpoint = "api/Auth/login";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: "text" as const
    };

    return this.http.post(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions)
      .pipe(
        timeout(5000),
        retry(1)
    );
  }

  toRegPost(body: RegistRequestBody): Observable<any> {
    const endpoint = "api/Auth/registration";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions)
      .pipe(
        timeout(5000),
        retry(1)
    );
  }

  toVerPost(body: VerifRequestBody): Observable<any> {
    const endpoint = "api/Auth/verification";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: "text" as const
    };

    return this.http.post(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions)
      .pipe(
        timeout(5000),
        retry(1)
    );
  }

  toRoomsGet(token: string): Observable<any> {
    const endpoint = "api/room";
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };

    return this.http.get(`${this.apiURL}/${endpoint}`, httpOptions)
      .pipe(
        timeout(5000),
        retry(1)
    );
  }

  toCreateRoom(token: string, getName: string){
    const endpoint = "api/room";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${this.apiURL}/${endpoint}?name=${getName}`, {}, httpOptions);
  }

  toPostFiles(token: string, roomId: string, file: File){
    const endpoint = "api/Upload/";
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    const formData = new FormData() 
    formData.append("file", file, file.name)

    return this.http.post(`${this.apiURL}/${endpoint}${roomId}`, formData, httpOptions)
      .pipe(
        timeout(50000)
    );
  }

  toGetFile(token: string, fileId: string): Observable<any>{
    const endpoint = "api/File/"
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'blob' as 'json',
      observe: 'response' as const
    }

    return this.http.get<Blob>(`${this.apiURL}/${endpoint}${fileId}`, httpOptions)
  }
  toGetFiles(token: string, roomId: string): Observable<any>{
    const endpoint = "api/Files/"
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get(`${this.apiURL}/${endpoint}${roomId}`, httpOptions);
  }

  toDeleteRoom(token: string, roomId: string){
    const endpoint = "api/Room/";
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.delete(`${this.apiURL}/${endpoint}${roomId}`, httpOptions);
  }

  toAddUser(token: string, roomId: string, email: string, role: number = 0){

    const endpoint = "api/Room/invite";
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    }
    const body = {
      "rid": roomId,
      "userLogin": email,
      "role": role
    }
    console.log(body)

    return this.http.patch(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions);

  }

  toGetUsers(token: string, roomId: string){
    const endpoint = "api/Room/users/";
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    }

    return this.http.get(`${this.apiURL}/${endpoint}${roomId}`, httpOptions);
  }

  toKickUser(token: string, roomId: string, userId: string){

    const endpoint = "api/Room/remove";
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    }
    const body = {
      "rid": roomId,
      "uid": userId,
    }

    return this.http.patch(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions);

  }

  toLeaveRoom(token: string, roomId: string){

    const endpoint = "api/Room/leave/";
    const httpOptions ={
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.patch(`${this.apiURL}/${endpoint}${roomId}`, {}, httpOptions);

  }
}