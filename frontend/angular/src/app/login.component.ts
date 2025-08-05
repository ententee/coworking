import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../user-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  protected username = signal("")
  protected password = signal("")
  protected error = signal(false)

  constructor(private userService: UserService, private router: Router) {
  }

  protected async login() {
    try {
      await this.userService.login(this.username(), this.password())
      await this.router.navigate(["/items"])
    } catch (error) {
      this.error.set(true)
    }
  }
}
