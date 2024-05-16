import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonAuthComponent } from 'src/app/ui/button-auth/button-auth.component';
import { InputAuthComponent } from 'src/app/ui/input-auth/input-auth.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterModule,
    InputAuthComponent,
    ButtonAuthComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  public fullName: string = ""
  public email: string = ""
  public password: string = ""

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.email, this.password, this.fullName);
  }

}
