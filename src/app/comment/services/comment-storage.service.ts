import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentStorageService {

  constructor() { }

  saveComment(photoId: string, comment: string) {
    const comments = this.getComments() || [];
    comments.push({ photoId, comment });
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  getComments(): { photoId: string, comment: string }[] | null {
    const commentsString = localStorage.getItem('comments');
    return commentsString ? JSON.parse(commentsString) : null;
  }

  clearComments() {
    localStorage.removeItem('comments');
  }
}
