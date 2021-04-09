import { Component, OnInit } from '@angular/core';
import {detailExpand, fadeIn, questionCardAnimation} from "../../api/animations/animations";
import {Question} from "../../api/model/Question";
import {CommonService} from "../../api/service/common.service";
import {QuestionService} from "../../api/service/question.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  animations: [questionCardAnimation, detailExpand, fadeIn]
})
export class ExploreComponent implements OnInit {

  public questions$: Observable<Question[]>;
  public questionCardThemes: {[key: string]: {color: string, transColor: string}} = {};
  public selectedQuestion: Question = null;

  constructor(
    public common: CommonService,
    public questionService: QuestionService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.queryQuestions();
    this.generateQuestionThemeColors();
  }

  public selectQuestion = (question: Question): void => {
    this.selectedQuestion = this.selectedQuestion === question ? null : question;
    console.log(this.selectedQuestion);
  }

  public getRandomAnimationTime = (): { params: { time: number } } => {
    return {
      params: {time: Math.random() * (4000 - 400) + 400},
    };
  }

  public send = (question: Question): void => {
    if (!question.answer) return;

    this.questionService.sendAnswer(question);
  }

  private queryQuestions = (): void => {
    this.questions$ = this.questionService.getRandomQuestions();
  }

  private generateQuestionThemeColors = (): void => {
    this.questions$.subscribe(questions => {
      questions.forEach(question => {
        const color = this.common.getDarkColor();
        this.questionCardThemes[question.uid] = {} as {color: string, transColor: string};
        this.questionCardThemes[question.uid].color = color;
        this.questionCardThemes[question.uid].transColor = `${color}30`
      })
    })
  }

}
