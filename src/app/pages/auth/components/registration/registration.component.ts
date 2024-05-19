import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ButtonAuthComponent } from 'src/app/ui/button-auth/button-auth.component';
import { InputAuthComponent } from 'src/app/ui/input-auth/input-auth.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterModule,
    InputAuthComponent,
    ButtonAuthComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [
    ApiService
  ]
})
export class RegistrationComponent {

  public fullName: string = ""
  public email: string = ""
  public password: string = ""

  public gotDate = false;
  public code: string = "";

  constructor(private apiService: ApiService) { }

  onSubmit(event: Event) {
    event.preventDefault();

    this.apiService.toRegPost({
      login: this.email,
      password: this.password,
      userName: this.fullName
    }).subscribe(
      (response: any)=>{
        this.gotDate = true;
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    )

    console.log(this.email, this.password, this.fullName);
  }
  onCheckCode(event: Event){
    event.preventDefault();

    this.gotDate = false;
    this.apiService.toVerPost({
      login: this.email,
      code: this.code
    }).subscribe(
      (response: any)=>{
        this.gotDate = true;
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    )

    console.log(this.code);
  }

}
