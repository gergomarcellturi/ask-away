import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../api/service/auth.service";
import {User} from "../../api/model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public save = (user: User): void => {
    console.log(user);
    if (!user.displayName) return;

    this.auth.updateUserData(user, user.displayName).then(() => location.reload())
  }

}
