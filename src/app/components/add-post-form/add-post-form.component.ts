import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent {
  private posts = this.postService.getPosts();
  private postsSubscription: Subscription;

  constructor(
    private postService: PostService,
    private usersService: UsersService) {
      this.postsSubscription = postService.postsChange.subscribe(posts => {
        this.posts = posts;
      });
    }

  public addPost(form: NgForm): void {
    const newPost: Post = {
      creator: this.usersService.getCurrentUser(),
      theme: form.value.theme,
      text: form.value.text,
      creatingDate: new Date()
    };

    this.postService.addPost(newPost);
    form.reset();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
