import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsFeatureService } from '../posts-feature.service';
import { postsInitialState } from '../posts-state.model';
import { PostsOverviewFormService } from '../presentation/posts-search/form/posts-overview-form.service';
import { IPostsSearchUi } from '../presentation/posts-search/posts-search.ui.model';

import { PostsContainerComponent } from './posts-container.component';

describe('PostsContainerComponent', () => {
	let component: PostsContainerComponent;
	let fixture: ComponentFixture<PostsContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostsContainerComponent],
			imports: [HttpClientTestingModule, ReactiveFormsModule],
			providers: [PostsOverviewFormService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PostsContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should search with the form values', () => {
		const formValue: IPostsSearchUi = {
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz'
		};
		component.formGroup.setValue(formValue);
		const featureService =
			fixture.debugElement.injector.get(PostsFeatureService);
		const spyOnFacadeSearch = spyOn(featureService, 'search');
		component.onSearch();
		expect(spyOnFacadeSearch).toHaveBeenCalledWith(formValue);
	});

	it('should reset the form values', () => {
		const formValue: IPostsSearchUi = {
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz'
		};
		component.formGroup.setValue(formValue);
		component.onReset();
		expect(component.formGroup.value).toEqual(postsInitialState.searchValues);
	});
});
