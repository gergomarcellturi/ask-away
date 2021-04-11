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
  public searchTags: string[] = [];

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
    return votes.length;
  }

  public castVote = (questionUid: string, vote: number): void => {
    this.questionService.voteQuestion(questionUid, vote);
  }

  public reSelect = (path: string): void => {
    if (path === 'explore') this.exploreExpanded = true;
  }

  public addTagToSearch = (tag: Tag): void => {
    if (this.searchTags.some(searchTag => searchTag === tag.tag )) return;

    this.exploreExpanded = true;
    this.searchTags = [...this.searchTags, tag.tag];
  }

  public selectQuestion = (question: Question): void => {
    this.selectedQuestion = this.selectedQuestion === question ? null : question;
  }

  public getRandomAnimationTime = (): { params: { time: number } } => {
    return {
      params: {time: Math.random() * (4000 - 400) + 400},
    };
  }

  public send = (question: Question): void => {
    if (!question.answer) return;

    this.questionService.sendAnswer(question);
    this.selectedQuestion = null;
    this.common.openSnackbar('Answer submitted!');
  }

  public search = async (): Promise<void> => {
    if (this.searchTags.length === 0 ) this.queryQuestions();
    else this.questions$ = this.questionService.getRandomQuestionsByTags(await this.common.createTags(this.searchTags, this.questionService), 10)
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
