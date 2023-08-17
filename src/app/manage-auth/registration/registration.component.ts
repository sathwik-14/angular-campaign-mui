import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-registration",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent {
  invalidEmail = false;
  invalidPassword = false;
  constructor(private authService: AuthService) {}
  onSubmit(form: NgForm) {
    this.invalidEmail = false;
    this.invalidPassword = false;
    let user = this.authService.getUsersByEmail(form.value.email);
    if (user) {
      if (user.password === form.value.password) {
        console.log("Logged in successfully");
      } else this.invalidPassword = true;
    } else this.invalidEmail = true;
  }
}
