import {Component, HostListener, OnInit} from '@angular/core';
import {Question} from "../../api/model/Question";
import {AuthService} from "../../api/service/auth.service";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {QuestionService} from "../../api/service/question.service";
import {detailExpand, fade, valueChanged} from "../../api/animations/animations";
import {timer} from "rxjs";
import {Tag} from "../../api/model/Tag";

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
    this.question.tags = await this.createTags() || [(await this.questionService.getTagByName('general')).ref];
    this.questionService.sendQuestion(this.question);
    this.expanded = false;
    timer(1500).subscribe(() => this.resetQuestion());
  }

  public createTags = async (): Promise<DocumentReference<Tag>[]> => {
    if (this.tags.length === 0) return null;
    let tagList: DocumentReference<Tag>[] = [];
    for (let tag of this.tags) {
      let databaseTag = await this.questionService.getTagByName(tag)
      tagList = [...tagList, databaseTag.uid ? databaseTag.ref : await this.questionService.saveTag(tag)]
    }
    return tagList;
  }

  public log(data:any) {
    console.log(data);
  }

  private resetQuestion = (): void => {
    this.expanded = false;
    this.tags = [];
    this.question = {detail: null} as Question;
    this.questionCheckbox = false;

  }

}
