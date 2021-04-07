import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {FlipModule} from "ngx-flip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HeaderComponent } from './components/header/header.component';
import { QuestionComponent } from './components/question/question.component';
import {TagInputModule} from "ngx-chips";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    QuestionComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    TagInputModule,
    ReactiveFormsModule,
    FlipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
