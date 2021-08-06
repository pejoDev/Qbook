import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/utils/state-management/state';
import { IPostsState } from '../posts-overview/posts-state.model';
import { IPostsSearchResultUi } from '../posts-overview/presentation/posts-search-result/posts-search-result.ui.model';

@Component({
	selector: 'app-post-details',
	templateUrl: './post-details.component.html',
	styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
	postsSearchResultUi!: IPostsSearchResultUi;

	constructor(
		private router: ActivatedRoute,
		private state: State<IPostsState>
	) {
		const postId = this.router.snapshot.params['id'];

		this.postsSearchResultUi = <IPostsSearchResultUi>(
			this.state.snapshot.searchResult?.find(
				(searchResult: IPostsSearchResultUi) => {
					return postId === searchResult.postId.toString();
				}
			)
		);
	}

	ngOnInit(): void {}
}
