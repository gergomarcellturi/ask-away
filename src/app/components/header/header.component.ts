import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../api/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public activatedRoute: EventEmitter<string>;

  constructor(
    public auth: AuthService,
  ) {
    this.activatedRoute = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  public activateRoute = (path: string): void => {
    this.activatedRoute.emit(path);
  }

}
