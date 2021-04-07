import { Component, OnInit } from '@angular/core';
import {Question} from "../../api/model/Question";
import {AuthService} from "../../api/service/auth.service";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {QuestionService} from "../../api/service/question.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css', './question.component.scss']
})
export class QuestionComponent implements OnInit {

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
