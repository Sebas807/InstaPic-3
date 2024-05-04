import { Component, Input } from '@angular/core';
import { CommentStorageService } from './services/comment-storage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() photo: any;
  commentText: string = '';

  constructor(private commentStorageService: CommentStorageService) { }

  onSubmit() {
    if (this.commentText.trim()) {
      this.commentStorageService.saveComment(this.photo.id,this.commentText.trim());
      this.commentText = ''; 
    }
  }
}
