import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {AuthService} from "../../api/service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.activeRoute = path;
  }

  public emitEventToChild = (path: string): void => {
    this.eventsSubject.next(path);
  }
}
