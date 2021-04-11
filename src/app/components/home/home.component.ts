import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {AuthService} from "../../api/service/auth.service";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('footerComponent', {static: false}) footerComponentRef: FooterComponent;

  public activeRoute = 'explore';
  public eventsSubject: Subject<string> = new Subject<string>();

  constructor(
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  public activatedRoute = (path: string): void => {
    if (this.activeRoute === path) {
      this.emitEventToChild(path);
    }
    console.log(this.footerComponentRef);
    if (path === 'about') {
      this.footerComponentRef.scrollElement.nativeElement.scrollIntoView({behavior: 'smooth'});
      return;
    }
    this.activeRoute = path;
  }

  public emitEventToChild = (path: string): void => {
    this.eventsSubject.next(path);
  }
}
