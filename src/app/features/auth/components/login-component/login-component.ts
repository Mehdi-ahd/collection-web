import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../shared/interfaces/User';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login-component',
  styleUrl: './login-component.scss',
  templateUrl: './login-component.html',
})

export class LoginComponent {

  router = inject(Router);

  authService = inject(AuthService);

  loginFormGroup = new FormGroup({
    email: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    })
  });

  login() {
    const credentials = this.loginFormGroup.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['collection'])
        //this.authService.setUser(response.data.user);
      },
      error: (error) => {
        console.log("Erreur lors de la connexion", error)
      }
    })
  }
}
