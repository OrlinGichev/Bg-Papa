import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  posts: Observable <any[]> | null = null;

  constructor( private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getPostsList();
  }

  getPostsList(limit?: number) {
    return this.posts = this.firestore.collection<Post>('posts').valueChanges();
  }

  getCurrentPost(postId: string): Observable<any> {  
    console.log(this.firestore.collection('posts').doc('Y56bzNJzVdsMcrgHBivf'));  
    return this.firestore.collection('posts').doc(postId).valueChanges();
  }
  
}
