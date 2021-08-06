import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PostsFeatureService } from '../../posts-feature.service';
import { IPostsSearchUi } from '../posts-search/posts-search.ui.model';
import { IPostsSearchResultUi } from './posts-search-result.ui.model';

@Component({
	selector: 'app-posts-search-result',
	templateUrl: './posts-search-result.component.html',
	styleUrls: ['./posts-search-result.component.scss']
})
export class PostsSearchResultComponent {
	@Input() searchResult$!: Observable<IPostsSearchResultUi[]>;
}
