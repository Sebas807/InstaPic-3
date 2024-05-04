import { TestBed } from '@angular/core/testing';

import { CommentStorageService } from './comment-storage.service';

describe('CommentStorageService', () => {
  let service: CommentStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
