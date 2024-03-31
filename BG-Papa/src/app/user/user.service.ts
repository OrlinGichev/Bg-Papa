import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() { }

  login() { 

    this.user = {
      id: 'u4Trm3qpXpPPocBcgJX5',
      email: 'petkoivanov@gmail.com',
      password: '123123',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));

  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);

  }
}
