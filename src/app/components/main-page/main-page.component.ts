import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';

import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  public currentUser: User = this.usersService.getCurrentUser();
  public posts: Post[] = this.postService.getPosts();
  private postsSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private statusService: StatusService,
    private postService: PostService) {
      this.postsSubscription = postService.postsChange.subscribe(posts => {
        this.posts = posts;
      });
    }

  public logOut(): void {
    this.usersService.removeCurrentUser();
    this.statusService.changeStatus('logging');
  }

  public clearAllPosts(): void {
    if (!confirm('Are you sure you want to delete all posts?')) return;
    this.postService.clearAllPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
