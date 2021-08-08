import { Component, Input } from '@angular/core';
import { IPostsSearchResultUi } from '../posts-overview/presentation/posts-search-result/posts-search-result.ui.model';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent {
	@Input()
	postsSearchResultUi!: IPostsSearchResultUi;

	@Input()
	showLinkToPostDetails: boolean = true;
}
