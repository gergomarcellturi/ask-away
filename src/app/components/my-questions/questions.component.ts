import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../api/service/question.service";
import {Question} from "../../api/model/Question";
import {Answer} from "../../api/model/Answer";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions: Promise<Question[]>
  public answerMap: {[key: string]: Promise<Answer[]>} = {};

  constructor(
    public questionService: QuestionService
  ) {
    this.questions = questionService.getQuestionsForLoggedInUser();
  }

  async ngOnInit(): Promise<void> {
  }

  public showAnswers = (question: Question): void => {
    this.answerMap[question.uid] = this.questionService.getAnswersForQuestionUid(question.uid);
  }
}
