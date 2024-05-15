import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.email, this.password);
  }

}
