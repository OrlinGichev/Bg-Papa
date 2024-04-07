import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthActivate } from '../guards/auth.activate';
import { CurrentPostComponent } from './current-post/current-post.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  
  { path: 'new',
   component: NewPostComponent,
   canActivate: [AuthActivate]
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }