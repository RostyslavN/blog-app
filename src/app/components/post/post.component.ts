import { Component, Input } from '@angular/core';

import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post;
  public currentUser: User = this.usersService.getCurrentUser();

  constructor(
    private postService: PostService,
    private usersService: UsersService) { }

  public deletePost(): void {
    if (!confirm('Are you sure you want to delete this post?')) return;
    this.postService.deletePost(this.post);
  }
}
