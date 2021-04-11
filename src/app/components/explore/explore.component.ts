import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {detailExpand, fadeIn, questionCardAnimation} from "../../api/animations/animations";
import {Question} from "../../api/model/Question";
import {CommonService} from "../../api/service/common.service";
import {QuestionService} from "../../api/service/question.service";
import {Observable, Subscription} from "rxjs";
import {Tag} from "../../api/model/Tag";
import {TagInputForm} from "ngx-chips";
import {Vote} from "../../api/model/Votes";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css', 'search-tag-input-theme.scss'],
  animations: [questionCardAnimation, detailExpand, fadeIn]
})
export class ExploreComponent implements OnInit, OnDestroy {

  @ViewChild('tagInputElement', {static: false})
  public tagInputElement: TagInputForm;

  @Input() events: Observable<string>;
  private eventSub: Subscription;

  public exploreExpanded = false;
  public questions$: Observable<Question[]>;
  public tags$: Observable<Tag[]>;
  public questionCardThemes: {[key: string]: {color: string, transColor: string}} = {};
  public selectedQuestion: Question = null;
  public searchTags: {value: string, display: string}[] = [];

  constructor(
    public common: CommonService,
    public questionService: QuestionService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.queryQuestions();
    this.queryTags();
    this.eventSub = this.events.subscribe(path => this.reSelect(path));
    this.generateQuestionThemeColors();
  }

  ngOnDestroy() {
    this.eventSub.unsubscribe();
  }

  public voteTest = (votes: Vote[]): number => {
    console.log(votes);
    return votes.length;
  }

  public castVote = (questionUid: string, vote: number): void => {
    this.questionService.voteQuestion(questionUid, vote);
  }

  public reSelect = (path: string): void => {
    if (path === 'explore') this.exploreExpanded = true;
  }

  public addTagToSearch = (tag: Tag): void => {
    console.log(this.tagInputElement);
    if (!this.searchTags.some(searchTag => searchTag.value === tag.tag )) return;
    this.searchTags = [...this.searchTags, {value: tag.tag , display: tag.tag}];
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

  public getTagDataByUidAndTagArray = (uid: string, tagarray: Tag[] ): Tag => {
    return tagarray?.find(tagElement => tagElement.uid === uid);
  }

  private queryQuestions = (): void => {
    this.questions$ = this.questionService.getRandomQuestions();
  }

  private queryTags = (): void =>{
    this.tags$ = this.questionService.getTags();
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
