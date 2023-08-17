import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  invalidEmail = false;
  invalidPassword = false;
  constructor(private authService: AuthService,private router: Router) {
    if (authService.isLogged())
     router.navigate(['/login']);
  }
  // onSubmit(form: NgForm) {
  //   this.invalidEmail = false;
  //   this.invalidPassword = false;
  //   let user = this.authService.getUsersByEmail(form.value.email);
  //   if (user) {
  //     if (user.password === form.value.password) {
  //       this.authService.logIn(user)
  //       this.router.navigate(['campaign'])
  //     } else this.invalidPassword = true;
  //   } else this.invalidEmail = true;
  // }

  onSubmit(form: NgForm) {
    this.invalidEmail = false;
    this.invalidPassword = false;
    // this.authService.getUsers().subscribe(users=>console.log(users))
    this.router.navigate(['campaign']);
  }
}
