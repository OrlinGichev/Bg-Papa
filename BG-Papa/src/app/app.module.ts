import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryListComponent,
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
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"bg-papa","appId":"1:199505387036:web:d07294a698aa7912ee49d9","storageBucket":"bg-papa.appspot.com","apiKey":"AIzaSyAnclsO3g-FUHxSjUQu6--PKKogdJV6EGw","authDomain":"bg-papa.firebaseapp.com","messagingSenderId":"199505387036"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
