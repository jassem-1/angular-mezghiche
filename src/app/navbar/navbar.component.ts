import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dynamicTitle: string = 'Providers';  // Default title

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle(); // Update title on navigation end
    });

    // Initial title check on component load
    this.updateTitle();
  }

  updateTitle(): void {
    const currentUrl = this.router.url;
    console.log(currentUrl); // Debugging to check the current URL
  
    if (currentUrl.includes('provider')) {
      this.dynamicTitle = 'Providers';
    } else if (currentUrl.includes('Article')) {
      this.dynamicTitle = 'Articles';
    }
  }
  

  getTitle(): string {
    return this.dynamicTitle;
  }
}
