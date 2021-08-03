import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { IPost } from 'src/app/data-access/posts/post.model';
import { PostsFeatureService } from 'src/app/feature/posts/posts-feature.service';
import { IPostsSearchUi } from '../posts-search/posts-search.ui.model';
import { IPostsSearchResultUi } from './posts-search-result.ui.model';

@Component({
	selector: 'app-posts-search-result',
	templateUrl: './posts-search-result.component.html',
	styleUrls: ['./posts-search-result.component.scss']
})
export class PostsSearchResultComponent implements OnInit {
	constructor(private postsFeatureService: PostsFeatureService) {
		this.searchResult$ = this.postsFeatureService.searchResult$;
		this.postsFeatureService.searchResult$.subscribe(console.log);
	}

	public searchResult$: Observable<IPostsSearchResultUi[]>;

	ngOnInit(): void {
		// TODO this.searchResult$ = this.postsFeatureService.searchResult$;

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
