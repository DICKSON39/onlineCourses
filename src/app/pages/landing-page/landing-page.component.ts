import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  isMobileMenuOpen: boolean = false; // New property for mobile menu state

  constructor(private router: Router) {}

  featuredCourses = [
    {
      title: 'Data Science',
      description: 'Learn revolutionary data science skills.',
      image:
        'https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Digital Marketing',
      description: 'Master the art of online marketing.',
      image:
        'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Graphic Design',
      description: 'Become a pro in visual communication.',
      image:
        'https://images.unsplash.com/photo-1617695744007-68ef55752789?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEdyYXBoaWMlMjBEZXNpZ258ZW58MHx8MHx8fDA%3Dg',
    },
  ];

  steps = [
    { icon: '📝', title: 'Sign Up' },
    { icon: '📚', title: 'Choose a Course' },
    { icon: '🎯', title: 'Start Learning' },
  ];

  // Method to toggle mobile menu visibility
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Method to close mobile menu after navigation
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onclick() {
    this.router.navigate(['courses/register']);
    this.closeMobileMenu(); // Close menu after navigation
  }
}
