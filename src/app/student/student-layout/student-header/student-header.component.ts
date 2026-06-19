import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-student-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './student-header.component.html',
  styleUrl: './student-header.component.css'
})
export class StudentHeaderComponent implements OnInit {
   isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();

    // Re-check login status on each navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkLogin());
  }

  checkLogin(): void {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = !!localStorage.getItem('user');
    } else {
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');  // Remove login info from localStorage
    }
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
