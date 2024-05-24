import { CookieService } from '@/app/services/cookie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ButtonAuthComponent } from 'src/app/ui/button-auth/button-auth.component';
import { InputAuthComponent } from 'src/app/ui/input-auth/input-auth.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterModule,
    InputAuthComponent,
    ButtonAuthComponent,
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  public fullName: string = ""
  public email: string = ""
  public password: string = ""

  public gotData = false;
  public code: string = "";

  constructor(private apiService: ApiService, private errorService: ErrorService, private router: Router, private cookieService: CookieService) { }

  onSubmit(event: Event) {
    event.preventDefault();

    this.apiService.toRegPost({
      login: this.email,
      password: this.password,
      userName: this.fullName
    }).subscribe(
      (response: any)=>{
        this.gotData = true;
        console.log(response);
      },
      (error: any) => {

        switch(error.status){
          case 409:
            this.errorService.setError("Этот аккаунт уже зарегестрирован и ждёт подтверждения");
            break;

          default:
            this.errorService.setError("Ошибка подключения");
            break;
        }
      }
    )

    console.log(this.email, this.password, this.fullName);
  }

  onCheckCode(event: Event){
    event.preventDefault();

    this.apiService.toVerPost({
      login: this.email,
      code: this.code
    }).subscribe(
      (response: string)=>{
        console.log(response);

        this.cookieService.setCookie("token", response, { expires: this.apiService.expires });
        this.router.navigate(["/rooms"]);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        
        switch(error.status){
          case 404:
            this.errorService.setError("Такого пользователя не существует или он уже верефецирован");
            break;
          case 409:
            this.errorService.setError("Неверный код");
            break;

          default:
            this.errorService.setError("Ошибка подключения");
            break;
        }
      }
    )

  }

  onCode(){
    const enRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.email || !enRegExp.test(this.email)) {
      this.errorService.setError("Введите свою почту перед подтверждением");
      return;
    }

    this.gotData = true;
  }

  onReg(){
    this.gotData = false;
  }

}
