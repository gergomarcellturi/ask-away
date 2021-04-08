import { Component, OnInit } from '@angular/core';
import {questionCardAnimation} from "../../api/animations/animations";
import {Question} from "../../api/model/Question";
import {CommonService} from "../../api/service/common.service";
import {QuestionService} from "../../api/service/question.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  animations: [questionCardAnimation]
})
export class ExploreComponent implements OnInit {

  public questions$: Observable<Question[]>;
  public questionCardThemes: {[key: string]: {color: string, transColor: string}} = {};

  constructor(
    public common: CommonService,
    public questionService: QuestionService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.queryQuestions();
    this.generateQuestionThemeColors();
  }

  log(data) {
    console.log(data);
    console.log(data.target);
  }

  public getRandomAnimationTime = (): { params: { time: number } } => {
    return {
      params: {time: Math.random() * (4000 - 400) + 400},
    };
  }

  private queryQuestions = (): void => {
    this.questions$ = this.questionService.getRandomQuestions();
  }

  private generateQuestionThemeColors = (): void => {
    this.questions$.subscribe(questions => {
      questions.forEach(question => {
        const color = this.common.generateRandomColor();
        this.questionCardThemes[question.uid] = {} as {color: string, transColor: string};
        this.questionCardThemes[question.uid].color = color;
        this.questionCardThemes[question.uid].transColor = `${color}30`
      })
      console.log(this.questionCardThemes);
    })
  }

}
