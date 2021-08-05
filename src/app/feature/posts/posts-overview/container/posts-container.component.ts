import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostsFeatureService } from '../posts-feature.service';
import { IPostsSearchResultUi } from '../presentation/posts-search-result/posts-search-result.ui.model';
import { IPostsSearchUi } from '../presentation/posts-search/posts-search.ui.model';

@Component({
	selector: 'app-posts-container',
	templateUrl: './posts-container.component.html',
	styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
	public searchResult$: Observable<IPostsSearchResultUi[]>;

	constructor(private postsFeatureService: PostsFeatureService) {
		this.searchResult$ = this.postsFeatureService.searchResult$;
	}

	ngOnInit(): void {
		this.initSearchValuesAndSearch();
	}

	private initSearchValuesAndSearch(): void {
		this.postsFeatureService
			.init()
			.pipe(take(1))
			.subscribe(() => {
				this.onSearch();
			});
	}
	onSearch(): void {
		let fakedSearchValues: IPostsSearchUi = {
			name: '',
			username: '',
			email: ''
		};
		this.postsFeatureService.search(fakedSearchValues);
	}
}
