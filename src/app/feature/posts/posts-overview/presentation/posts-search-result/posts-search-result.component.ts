import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsSearchResultUi } from './posts-search-result.ui.model';

@Component({
	selector: 'app-posts-search-result',
	templateUrl: './posts-search-result.component.html',
	styleUrls: ['./posts-search-result.component.scss']
})
export class PostsSearchResultComponent {
	@Input() searchResult$!: Observable<IPostsSearchResultUi[]>;
}
