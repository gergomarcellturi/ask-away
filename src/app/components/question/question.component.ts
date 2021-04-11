import {Component, HostListener, OnInit} from '@angular/core';
import {Question} from "../../api/model/Question";
import {AuthService} from "../../api/service/auth.service";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {QuestionService} from "../../api/service/question.service";
import {detailExpand, fade, valueChanged} from "../../api/animations/animations";
import {timer} from "rxjs";
import {CommonService} from "../../api/service/common.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css', './question.component.scss', 'foundation-themes.scss'],
  animations: [detailExpand, fade, valueChanged]
})
export class QuestionComponent implements OnInit {

  public question: Question = {detail: null} as Question;
  public questionCheckbox = false;
  public tags: string[] = [];
  public expanded = false;

  constructor(
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public common: CommonService,
    public questionService: QuestionService,
  ) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'Escape'){
      // Your row selection code
      this.resetQuestion();
    }
  }

  public expand = (): void => {
    this.expanded = !this.expanded;
  }

  public send = async (): Promise<void> => {
    if (!this.question.question) return;
    this.question.tags = await this.common.createTags(this.tags, this.questionService) || [(await this.questionService.getTagByName('general')).ref];
    this.questionService.sendQuestion(this.question);
    this.expanded = false;
    timer(1500).subscribe(() => this.resetQuestion());
  }

  private resetQuestion = (): void => {
    this.expanded = false;
    this.tags = [];
    this.question = {detail: null} as Question;
    this.questionCheckbox = false;

  }

}
