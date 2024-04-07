import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Post } from './types/post';
import { Comment } from './types/Comment';

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
     
    return this.firestore.collection('posts').doc(postId).valueChanges();
  }

 
  
  getPostCountByCategory(category: string): Observable<number> {
    return this.firestore.collection<Post>('posts', ref => ref.where('category', '==', category)).valueChanges().pipe(
      map(posts => posts.length)
    );
  }
}
