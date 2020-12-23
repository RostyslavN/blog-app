import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input() postToEdit: Post;

  constructor(
    private postService: PostService,
    private modalService: NgbModal) { }

  public savePost(form: NgForm) {
    this.postToEdit.theme = form.value.theme;
    this.postToEdit.text = form.value.text;
    this.postService.editPost(this.postToEdit);
    form.reset();
    this.closeModal();
  }

  public openModal(modal: HTMLElement) {
    this.modalService.open(modal);
  }

  private closeModal() {
    this.modalService.dismissAll();
  }
}
