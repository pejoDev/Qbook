import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/data-access/posts/post.model';
import { PostsFeatureService } from 'src/app/feature/posts-feature.service';

@Component({
	selector: 'app-posts-search-result',
	templateUrl: './posts-search-result.component.html',
	styleUrls: ['./posts-search-result.component.scss']
})
export class PostsSearchResultComponent implements OnInit {
	constructor(private postsFeatureService: PostsFeatureService) {}

	searchResult$: Observable<IPost[]> = this.postsFeatureService.searchResult;

	ngOnInit(): void {}
}
