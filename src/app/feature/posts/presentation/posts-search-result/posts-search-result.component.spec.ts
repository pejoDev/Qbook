import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSearchResultComponent } from './posts-search-result.component';

describe('PostsSearchResultComponent', () => {
  let component: PostsSearchResultComponent;
  let fixture: ComponentFixture<PostsSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
