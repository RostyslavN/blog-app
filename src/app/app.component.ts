import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Users } from './shared/models/users';
import { UsersService } from './shared/services/users/users.service';
import { StatusService } from './shared/services/status/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'blog-app';
  public usersData: Users = this.usersService.getUsers();
  private usersDataSubscription: Subscription;

  public appStatus: string = this.statusService.getStatus();
  private statusSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private statusService: StatusService) {
      this.statusSubscription = this.statusService.statusChange.subscribe( changedStatus => {
          this.appStatus = changedStatus;
      });
      this.usersDataSubscription = this.usersService.usersDataChange.subscribe( changedUsersData => {
         this.usersData = changedUsersData;
      });
    }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
    this.usersDataSubscription.unsubscribe();
  }
}
