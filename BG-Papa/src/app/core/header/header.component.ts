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
    const storedUser = localStorage.getItem('currentUser');
    return !!storedUser;
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(currentUser => {
      this.username = currentUser?.username;      
    });
    const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    this.username = JSON.parse(storedUser)?.username;
     this.userService.getUserObservable().subscribe(user => {
      // Обновете нужната ви логика за рендиране на компонента с информацията за потребителя
    });
  }
  }
 
  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
