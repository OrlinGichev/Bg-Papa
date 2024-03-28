import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { UserModule } from './user/user.module';

import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { PostsModule } from './posts/posts.module';
import { PostsListComponent } from './posts-list/posts-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryListComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule, UserModule,
    FirestoreModule,
    PostsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
