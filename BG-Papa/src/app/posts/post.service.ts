import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Post } from '../types/post';



@Injectable({
  providedIn: 'root'
})
export class PostService {

    constructor(private firestore: AngularFirestore){}

    getPostsByCategory(category: string): Observable<Post[]> {

        const queryFn: QueryFn = ref => ref.where('category', '==', category)
        return this.firestore.collection<Post>('posts', queryFn)
        .valueChanges() as Observable<Post[]>;
    }

    updatePost(postId: string, newData: any): Promise<void> {
      const postRef = this.firestore.collection('posts').doc(postId);
      return postRef.update(newData);
    }
}