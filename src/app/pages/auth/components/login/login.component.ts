import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
    ButtonAuthComponent,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    ApiService
  ]
})
export class LoginComponent {

  public email: string = ""
  public password: string = ""

  constructor(private apiService: ApiService, private errorService: ErrorService, private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();
    
    this.apiService.toLogPost({
      login: this.email,
      password: this.password
    })
    .subscribe(
      (response: HttpResponse<"POST">)=>{
        console.log(response);
      },
      (error: HttpErrorResponse) => {

        this.errorService.setError("Ошибка");
        this.router.navigate(["/register"])

        if (error.status === 409) {
          console.log(error);

          
        };
      }
    )

    // console.log(this.email, this.password);
  }

}
