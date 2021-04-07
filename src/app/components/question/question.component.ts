import { Component, OnInit } from '@angular/core';
import {Question} from "../../api/model/Question";
import {AuthService} from "../../api/service/auth.service";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {QuestionService} from "../../api/service/question.service";
import {detailExpand, fade, valueChanged} from "../../api/animations/animations";
import {timer} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css', './question.component.scss', 'foundation-themes.scss'],
  animations: [detailExpand, fade, valueChanged]
})
export class QuestionComponent implements OnInit {

  public question: Question = {detail: null} as Question;
  public questionCheckbox = false;
  public items: string[];
  public expanded = false;

  constructor(
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public questionService: QuestionService,
  ) {
  }

  ngOnInit(): void {
  }

  public onSelect(item) {
    console.log(item);
  }

  public expand = (): void => {
    this.expanded = !this.expanded;
    console.log(this.expanded);
  }

  public send = (): void => {
    if (!this.question.question) return;
    this.questionService.sendQuestion(this.question);
    this.expanded = false;
    timer(1500).subscribe(() => this.question = {detail: null} as Question);
  }

  public log(data:any) {
    console.log(data);
  }

}
