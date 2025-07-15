import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from "./components/user-app/user-app.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserAppComponent],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('userApp');
}
