import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  username: string | undefined;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(currentUser => {
      this.username = currentUser?.username;
    });
  }
 
  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
