import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IComment } from 'src/app/data-access/comments/comment.model';
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
	}

	public searchResult$: Observable<IPostsSearchResultUi[]>;

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

	getPostComments(postId: number): Observable<IComment[]> {
		return this.postsFeatureService.getPostComments(postId);
	}
}
