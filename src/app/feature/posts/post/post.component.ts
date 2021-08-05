import { Component, Input, OnInit } from '@angular/core';
import { IPostsSearchResultUi } from '../posts-overview/presentation/posts-search-result/posts-search-result.ui.model';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input()
	postsSearchResultUi!: IPostsSearchResultUi;

	@Input()
	showLinkToPostDetails: boolean = true;

	@Input()
	showComments: boolean = true;

	constructor() {
		console.log('postsSearchResultUi', this.postsSearchResultUi);
	}

	ngOnInit(): void {}
}
