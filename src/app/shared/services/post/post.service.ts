import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[];
  public postsChange: Subject<Post[]> = new Subject<Post[]>();

  public addPost( post: Post) {
    this.posts = this.getPosts();
    this.posts.unshift(post);
    this.setLocalStoragePosts();
  }

  public getPosts(): Post[] | [] {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
    this.postsChange.next(this.posts);
    return this.posts;
  }

  public deletePost(postToDelete: Post): void {
    const postToDeleteIndex: number = this.posts.findIndex(post => {
      const postCreatingDate: Date = new Date(post.creatingDate);
      const postToDeleteCreatingDate: Date = new Date(postToDelete.creatingDate);
      return postCreatingDate.getTime() === postToDeleteCreatingDate.getTime();
    });
    this.posts.splice(postToDeleteIndex, 1);
    this.postsChange.next(this.posts);
    this.setLocalStoragePosts();
  }

  public editPost(editedPost: Post): void {
    const postToEditIndex: number = this.posts.findIndex(post => {
      const postCreatingDate: Date = new Date(post.creatingDate);
      const editedPostCreatingDate: Date = new Date(editedPost.creatingDate);
      return postCreatingDate.getTime() === editedPostCreatingDate.getTime();
    });
    this.posts[postToEditIndex] = editedPost;
    this.postsChange.next(this.posts);
    this.setLocalStoragePosts();
  }

  public clearAllPosts(): void {
    this.posts = [];
    this.postsChange.next(this.posts);
    this.setLocalStoragePosts();
  }

  private setLocalStoragePosts(): void {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
}
