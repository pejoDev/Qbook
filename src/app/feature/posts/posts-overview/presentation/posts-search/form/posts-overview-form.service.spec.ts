import { TestBed } from '@angular/core/testing';

import { PostsOverviewFormService } from './posts-overview-form.service';

describe('PostsOverviewFormService', () => {
  let service: PostsOverviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsOverviewFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
