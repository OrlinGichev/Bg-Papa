import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Post } from '../types/post';
import { Comment } from '../types/Comment';



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

    getPostComments(postId: string): Observable<Comment[]> {
      return this.firestore.collection<Post>('posts').doc(postId).get().pipe(
          map(snapshot => {
              const post = snapshot.data();
              return post ? post.comments : [];
          })
      );
  }

    addCommentToPost(postId: string, comment: Comment): Promise<void> {
      const postRef = this.firestore.collection('posts').doc(postId);
      return postRef.update({ comments: firebase.firestore.FieldValue.arrayUnion(comment) });
    }

    updatePost(postId: string, newData: any) {
  
      this.firestore.collection('posts').doc(postId).update(newData).then(() => {
        console.log("Post successfully updated!");
      }).catch((error) => {
        console.error("Error updating post: ", error);
      });
    }

    subscribePost(postId: string, userId: string): Promise<void> {
      const postRef = this.firestore.collection('posts').doc(postId);
      return postRef.update({ subscribers: firebase.firestore.FieldValue.arrayUnion(userId) });
    }

    unsubscribePost(postId: string, userId: string): Promise<void> {
      const postRef = this.firestore.collection('posts').doc(postId);
      return postRef.update({
        subscribers: firebase.firestore.FieldValue.arrayRemove(userId)
      });
    }

    isUserSubscribed(postId: string, userId: string): Observable<boolean> {
      return this.firestore.collection('posts').doc(postId).valueChanges().pipe(
        map((post: any) => {
          if (post && post.subscribers) {
            return post.subscribers.includes(userId);
          }
          return false;
        })
      );
    }
}