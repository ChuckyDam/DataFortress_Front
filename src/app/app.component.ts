import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBoxComponent } from './ui/error-box/error-box.component';
import { Subscription } from 'rxjs';
import { ErrorService } from './services/error.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ErrorBoxComponent
  ],
  providers: [
    ErrorService
  ],
  templateUrl: "./app.component.html",
  styleUrl: './app.component.scss'
})
export class AppComponent {

  active!: boolean;
  text!: string;

  activeSubscription: Subscription;
  textSubscription: Subscription;

  constructor(private errorService: ErrorService) {

    this.activeSubscription = this.errorService.active$.subscribe(active => {
      this.active = active
    });
    this.textSubscription = this.errorService.text$.subscribe(text => {
      this.text = text
    });

  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
    this.textSubscription.unsubscribe();
  }
  
}
