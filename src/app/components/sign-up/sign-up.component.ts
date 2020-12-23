import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from 'src/app/shared/services/users/users.service';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { User } from 'src/app/shared/models/user';
import { Users } from 'src/app/shared/models/users';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public radioBtnValue: string = 'male';
  public isLoginUsedAlready: boolean = false;
  private usersData: Users = this.usersService.getUsers();

  constructor(
    private usersService: UsersService,
    private statusService: StatusService) { }

  public registerUser(form: NgForm): void {
    if (
      form.value.login === this.usersData.defaultUser.login ||
      this.usersData.users.some(user => user.login === form.value.login)) {
        this.isLoginUsedAlready = true;
        return;
      }
    this.isLoginUsedAlready = false;
    const newUser: User = {
      name: form.value.name,
      surname: form.value.surname,
      login: form.value.login,
      password: form.value.password,
      email: form.value.email,
      gender: form.value.gender
    }
    this.usersService.addUser(newUser);
    form.reset();
    this.statusService.changeStatus('logging');
  }
}
