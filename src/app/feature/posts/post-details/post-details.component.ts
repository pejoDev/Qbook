import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPostsSearchResultUi } from '../posts-overview/presentation/posts-search-result/posts-search-result.ui.model';

@Component({
	selector: 'app-post-details',
	templateUrl: './post-details.component.html',
	styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
	postDetails: IPostsSearchResultUi;

	constructor(private router: Router) {
		this.postDetails =
			this.router.getCurrentNavigation()?.extras.state?.data.result;

		/* 
		Getting the data is not so obvious at a first glance.
		Someone could expect that ActivatedRoute will contain it, but there is no attribute for state.
		The state property was added to Navigation which is available through Router.getCurrentNavigation().extras.state.
		Problem is that getCurrentNavigation returns Navigation only during the navigation and returns null after the navigation ended.
		So the Navigationis no longer available in Component’s B onInit lifecycle hook.
		We need to read the data from browser’s history object*/
	}

	ngOnInit(): void {}
}
