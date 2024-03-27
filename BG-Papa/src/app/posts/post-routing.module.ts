import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';

const routes: Routes = [
    { path: 'new', component: NewPostComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }