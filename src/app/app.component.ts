import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  hide:boolean = false;
  
  logout(){

  }
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
