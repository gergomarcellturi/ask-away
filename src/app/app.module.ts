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
import {MatRippleModule} from "@angular/material/core";
import { ExploreComponent } from './components/explore/explore.component';
import { VarDirective } from './api/directive/var.directive';
import { QuestionsComponent } from './components/my-questions/questions.component';
import { AnswersComponent } from './components/answers/answers.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    QuestionComponent,
    ExploreComponent,
    VarDirective,
    QuestionsComponent,
    AnswersComponent,
    ProfileComponent
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
        MatRippleModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
