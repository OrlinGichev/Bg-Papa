import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  constructor(private firestore: Firestore) {
    // Проверка за наличие на потребител в localStorage при инстанциране на сервиса
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.user$$ = new BehaviorSubject<UserForAuth | undefined>(JSON.parse(savedUser));
    }
  }

  get isLogged(): boolean {
    return !!this.user$$.value;
  }

  login(email: string, password: string): Observable<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));

    return from(getDocs(q)).pipe(
      switchMap((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot.empty) {
          // Няма потребител с такъв email
          return of(false);
        } else {
          let loginSuccessful = false;
          querySnapshot.forEach((doc) => {
            const user = doc.data() as UserForAuth;
            // Проверка за съвпадение на паролата
            if (user.password === password) {
              this.user$$.next(user);
              // Запазване на данните на потребителя в localStorage
              localStorage.setItem('currentUser', JSON.stringify(user));
              loginSuccessful = true;
            }
          }); 
          this.getUserInfo();       
          return of(loginSuccessful);
        }
      }),
      catchError((error) => {
        console.error('Error getting documents: ', error);
        return of(false);
      })
    );
  }

  setUser(user: UserForAuth) {
    this.user$$.next(user);
  }

  getUserKeyFromLocalStorage(key: string): string | undefined {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const currentUser = JSON.parse(userData);
      return currentUser[key];
    }
    return undefined;
  }

  getUserObservable(): Observable<UserForAuth | undefined> {
    return this.user$$.asObservable();
  }

  logout() {
    // Изчистване на данните за потребителя от localStorage
    localStorage.removeItem(this.USER_KEY);
    this.user$$.next(undefined);
  }

  getUserInfo() {
    const currentUser = this.user$$.getValue();
    console.log(currentUser?.username); // Тук ще видите обекта на текущия потребител в конзолата
  }


  checkUserExists(username: string, email: string): Observable<boolean> {
    const userCollection = collection(this.firestore, 'users');
    const usernameQuery = query(userCollection, where('username', '==', username));
    const emailQuery = query(userCollection, where('email', '==', email));

    return from(getDocs(usernameQuery)).pipe(
      switchMap((usernameSnapshot: QuerySnapshot<DocumentData>) => {
        if(!usernameSnapshot.empty){
          return of(true);
        } else {
          return from(getDocs(emailQuery)).pipe(
            map( (emailSnapshot: QuerySnapshot<DocumentData>) => !!emailSnapshot.empty),
            catchError(() => of(false))
          );
        }
      }),
      catchError(() => of(false))
    );
  }
}
