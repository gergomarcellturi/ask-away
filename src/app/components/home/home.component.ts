import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../api/service/auth.service";
import {FormBuilder} from "@angular/forms";
import {Question} from "../../api/model/Question";
import {QuestionService} from "../../api/service/question.service";
import {AngularFirestore} from "@angular/fire/firestore";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss']
})
export class HomeComponent implements OnInit {

  public question: Question = {detail: null} as Question;

  constructor(
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public questionService: QuestionService,
  ) {
  }

  ngOnInit(): void {
  }


  public send = (): void => {
    if (!this.question.question) return;
    this.questionService.sendQuestion(this.question);
  }

}
