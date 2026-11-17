import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login-component',
  styleUrl: './login-component.scss',
  templateUrl: './login-component.html',
})
export class LoginComponent {

  router = inject(Router);

  authService = inject(AuthService);

  errorMessage = signal('');

  loginFormGroup = new FormGroup({
    email: new FormControl('', {
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
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');

    const credentials = this.loginFormGroup.getRawValue();

    // setSession() (token + user) est déjà géré par le service via tap().
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/collection']);
      },
      error: (error) => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage.set(error.error?.message ?? 'Connexion impossible pour le moment');
      }
    })
  }
}
