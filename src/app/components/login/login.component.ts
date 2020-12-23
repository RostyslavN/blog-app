import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Users } from 'src/app/shared/models/users';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private usersData: Users = this.usersService.getUsers();
  public passwordErrorMessage: string;

  constructor(
    private usersService: UsersService,
    private statusService: StatusService) { }

  public loginUser(form: NgForm): void {
    const loginStatus: string = this.checkLoginData(form.value);
    switch (loginStatus) {
      case 'password_error':
        this.passwordErrorMessage = 'Incorrect password';
        break;
      case 'admin':
        this.usersService.setCurrentUser(this.usersData.defaultUser);
        this.statusService.changeStatus('blogging');
        break;
      case 'user_error':
        if (confirm('There isn\'t such a user. Do you want to sign up?')) {
          this.statusService.changeStatus('registering');
        }
        break;
      default:
        this.usersService.setCurrentUser(JSON.parse(loginStatus));
        this.statusService.changeStatus('blogging');
        break;
    }
  }

  private checkLoginData(loginData: { login: string, password: string }): string {
    if (loginData.login === this.usersData.defaultUser.login) {
      if (loginData.password !== this.usersData.defaultUser.password) return 'password_error';
      return 'admin';
    }
    if (this.usersData.users.some(user => user.login === loginData.login)) {
      const enteredUser: User = this.usersData.users.find(user => user.login === loginData.login);
      if (enteredUser.password !== loginData.password) return 'password_error';
      return JSON.stringify(enteredUser);
    }
    return 'user_error';
  }
}
