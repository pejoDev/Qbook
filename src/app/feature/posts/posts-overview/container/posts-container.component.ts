import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostsFeatureService } from '../posts-feature.service';
import { IPostsSearchResultUi } from '../presentation/posts-search-result/posts-search-result.ui.model';
import { PostsOverviewFormService } from '../presentation/posts-search/form/posts-overview-form.service';
import { IPostsSearchUi } from '../presentation/posts-search/posts-search.ui.model';

@Component({
	selector: 'app-posts-container',
	templateUrl: './posts-container.component.html',
	styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
	public searchResult$: Observable<IPostsSearchResultUi[]>;

	formGroup: FormGroup = this.postsOverviewFormService.createFormGroup();
	constructor(
		private postsFeatureService: PostsFeatureService,
		private postsOverviewFormService: PostsOverviewFormService
	) {
		this.searchResult$ = this.postsFeatureService.searchResult$;
	}

	ngOnInit(): void {
		this.initSearchValuesAndSearch();
	}

	private initSearchValuesAndSearch(): void {
		this.postsFeatureService
			.init()
			.pipe(take(1))
			.subscribe(value => {
				this.postsOverviewFormService.value = <IPostsSearchUi>(
					value.searchValues
				);
				this.onSearch();
			});
	}
	onSearch(): void {
		this.postsFeatureService.search(this.postsOverviewFormService.value);
	}
}
