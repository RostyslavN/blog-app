import { Admin } from './admin';
import { User } from './user';

export interface Users {
  users: User[];
  defaultUser: Admin;
  currentUser: string;
}
