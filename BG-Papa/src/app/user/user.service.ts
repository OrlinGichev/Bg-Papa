import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

   currentUser: UserForAuth | undefined;

  constructor(private angularFirestore: AngularFirestore, private firestore :Firestore) {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.user$$.next(this.currentUser);
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
          return of(false);
        } else {
          let loginSuccessful = false;
          querySnapshot.forEach((doc) => {
            const user = doc.data() as UserForAuth;
            if (user.password === password) {
              this.user$$.next(user);
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
    localStorage.removeItem('currentUser');
    this.user$$.next(undefined);
  }

  getUserInfo(): Observable<UserForAuth | undefined> {
    return this.user$$.asObservable();
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

  updateInterests(userId: string, newInterests: string): Observable<void> {
    const userDocRef = this.angularFirestore.collection('users').doc(userId);
    const interestsUpdate = { interests: newInterests };
    
    return from(userDocRef.update(interestsUpdate))
      .pipe(
        catchError((error) => {
          console.error('Error updating user interests:', error);
          throw error;
        })
      );
  }

  deleteProfile(userId: string): Observable<void> {
    const userDocRef = this.angularFirestore.collection('users').doc(userId);
    return from(userDocRef.delete()).pipe(
      catchError((error) => {
        console.error('Error deleting user profile:', error);
        throw error;
      })
    );
  }
}
