import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/utils/state-management/state';
import { PostsFeatureService } from '../posts-feature.service';
import { IPostsState } from '../posts-state.model';
import { IPostsSearchResultUi } from '../presentation/posts-search-result/posts-search-result.ui.model';

@Component({
	selector: 'app-post-details',
	templateUrl: './post-details.component.html',
	styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
	postDetails: IPostsSearchResultUi;

	constructor() {
		this.postDetails = history.state.data?.result;
	}

	ngOnInit(): void {}
}
