import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../api/service/question.service";
import {Question} from "../../api/model/Question";
import {Answer} from "../../api/model/Answer";
import {detailExpand} from "../../api/animations/animations";
import {Observable, timer} from "rxjs";
import {User} from "../../api/model/user.model";
import {AuthService} from "../../api/service/auth.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [detailExpand]
})
export class QuestionsComponent implements OnInit {

  public selectedQuestion = null;
  public questions: Promise<Question[]>
  public answerMap: {[key: string]: Promise<Answer[]>} = {};
  public userMap: {[key: string]: Observable<User>} = {};

  constructor(
    public auth: AuthService,
    public questionService: QuestionService
  ) {
    this.questions = questionService.getQuestionsForLoggedInUser();
  }

  async ngOnInit(): Promise<void> {
  }

  public showAnswers = (question: Question): void => {
    if (!this.answerMap[question.uid]) {
      const answerPromise = this.questionService.getAnswersForQuestionUid(question.uid)
      this.answerMap[question.uid] = answerPromise;
      answerPromise.then(answers => this.createUserMap(answers));
      timer(250).subscribe(() => this.selectedQuestion = this.selectedQuestion === question ? null : question)
    } else {
      this.selectedQuestion = this.selectedQuestion === question ? null : question
    }
  }

  public createUserMap = (answers: Answer[]): void => {
    answers.forEach(answer => {
      if (!this.userMap[answer.submitter.id])
        this.userMap[answer.submitter.id] = this.auth.getUserByUid(answer.submitter.id);
    })
  }



}
