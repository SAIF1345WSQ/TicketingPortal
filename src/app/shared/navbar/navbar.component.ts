import { Component, inject } from '@angular/core';
import { RouterModule, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = false;
  private router = inject(Router);
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;


  }
  Logout() {
    this.router.navigate(['/login']);
  }
}
