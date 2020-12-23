import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from 'src/app/shared/models/user';
import { Users } from 'src/app/shared/models/users';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private defaulUsersData: Users = {
    users: [],
    defaultUser: { login: 'Admin', password: 'admin' },
    currentUser: ''
  };
  private usersData: Users;
  public usersDataChange: Subject<Users> = new Subject<Users>();

  private currentUser: User | null;
  public currentUserChange: Subject<User> = new Subject<User>();

  public addUser(user: User): void {
    this.usersData = this.getUsers();
    this.usersData.users.push(user);
    this.usersDataChange.next(this.usersData);

    this.setLocalStorageUsers();
  }

  public getUsers(): Users {
    this.usersData = JSON.parse(localStorage.getItem('users')) || this.defaulUsersData;
    this.usersDataChange.next(this.usersData);
    return this.usersData;
  }

  private setLocalStorageUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.usersData));
  }

  public setCurrentUser(user: User | Admin): void {
    this.currentUser = user as User;
    this.currentUserChange.next(this.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  public getCurrentUser(): User {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserChange.next(this.currentUser);
    return this.currentUser;
  }

  public removeCurrentUser(): void {
    this.currentUser = null;
    this.currentUserChange.next(this.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
