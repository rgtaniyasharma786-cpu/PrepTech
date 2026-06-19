import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const storedUsers = localStorage.getItem('registeredUsers');

      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigateByUrl('/student/home1');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password.'
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No Registered User',
          text: 'Please register first.'
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}





