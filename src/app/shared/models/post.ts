import { User } from "./user";

export interface Post {
  creator: User;
  theme: string;
  text: string;
  creatingDate: Date;
}
