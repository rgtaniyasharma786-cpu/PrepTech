import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
 registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const emailExists = users.some((user: any) => user.email === userData.email);
      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Email already registered. Please use a different email.'
        });
        return;  
      }
      users.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created!',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  }

