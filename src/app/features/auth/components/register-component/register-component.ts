import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

/**
 * Validateur de groupe : l'erreur vit sur le FormGroup,
 * elle est lue via registerFormGroup.hasError('passwordsMismatch').
 */
export function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const conf = group.get('password_confirmation')?.value;

  return pass === conf ? null : { passwordsMismatch: true };
}

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register-component',
  styleUrl: './register-component.scss',
  templateUrl: './register-component.html',
})
export class RegisterComponent {

  authService = inject(AuthService);

  router = inject(Router);

  errorMessage = signal('');

  registerFormGroup = new FormGroup({
    lastname: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    firstname: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
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
    }),
    password_confirmation: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    }),
  }, {
    validators: passwordsMatch
  });

  register() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');

    // getRawValue() lit l'état ACTUEL des contrôleurs : lastname, firstname,
    // email, password et password_confirmation → contrat RegisterRequest exact.
    this.authService.register(this.registerFormGroup.getRawValue()).subscribe({
      next: (response) => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription", error);
        this.errorMessage.set(error.error?.message ?? 'Inscription impossible pour le moment');
      }
    })
  }
}
