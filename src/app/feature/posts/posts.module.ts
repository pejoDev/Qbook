import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './container/posts-container.component';
import { PostsSearchComponent } from './presentation/posts-search/posts-search.component';
import { PostsSearchResultComponent } from './presentation/posts-search-result/posts-search-result.component';

@NgModule({
	declarations: [
		PostsContainerComponent,
		PostsSearchComponent,
		PostsSearchResultComponent
	],
	imports: [CommonModule],
	exports: [
		PostsContainerComponent,
		PostsSearchComponent,
		PostsSearchResultComponent
	]
})
export class PostsModule {}
