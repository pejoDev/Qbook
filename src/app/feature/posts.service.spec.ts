import { TestBed } from '@angular/core/testing';

import { PostsFeatureService } from './posts-feature.service';

describe('PostsService', () => {
	let service: PostsFeatureService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PostsFeatureService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
