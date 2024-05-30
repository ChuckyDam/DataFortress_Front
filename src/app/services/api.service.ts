import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  apiURL = 'https://m75qrf8f-7071.euw.devtunnels.ms';
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
        timeout(5000), // Ожидание ответа
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

    return this.http.patch(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions);

  }

  // // Отправка GET-запроса
  // get(endpoint: string, params?: any): Observable<any> {
  //   let queryString = '';
  //   if (params) {
  //     queryString = '?';
  //     Object.keys(params).forEach(key => {
  //       queryString += key + '=' + params[key] + '&';
  //     });
  //     queryString = queryString.slice(0, -1);
  //   }
  //   return this.http.get(`${this.apiURL}/${endpoint}${queryString}`)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //   );
  // }

  // // Отправка POST-запроса
  // post(endpoint: string, body: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //   );
  // }

  // // Отправка PUT-запроса
  // put(endpoint: string, body: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put(`${this.apiURL}/${endpoint}`, JSON.stringify(body), httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // // Отправка DELETE-запроса
  // delete(endpoint: string): Observable<any> {
  //   return this.http.delete(`${this.apiURL}/${endpoint}`)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // // Обработка ошибок
  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Обработка ошибки клиента или сети
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Обработка ошибки HTTP
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}