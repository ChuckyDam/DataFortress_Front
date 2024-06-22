import { CookieService } from '@/app/services/cookie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ButtonAuthComponent } from 'src/app/ui/button-auth/button-auth.component';
import { InputAuthComponent } from 'src/app/ui/input-auth/input-auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    InputAuthComponent,
    ButtonAuthComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email: string = ""
  public password: string = ""

  constructor(private apiService: ApiService, private errorService: ErrorService, private router: Router, private cookieService: CookieService) { }

  onSubmit(event: Event) {
    event.preventDefault();
    
    this.apiService.toLogPost({
      login: this.email,
      password: this.password
    })
    .subscribe(
      (response: string)=>{
        this.cookieService.setCookie("token", response, { expires: this.apiService.expires })
        this.router.navigate(["/rooms"]);
      },
      (error: HttpErrorResponse) => {
        console.error(error);

        switch(error.status){
          case 409:
            this.errorService.setError("Пользователь не подтверждён");
            break;
          case 404:
            this.errorService.setError("Пользователя не существует");
            break;
          case 400:
            this.errorService.setError("Неверный пароль");
            break;

          default:
            this.errorService.setError("Ошибка подключения");
            break;
        }
      }
    )

  }

}
