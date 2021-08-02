import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './container/posts-container.component';
import { PostsSearchComponent } from './presentation/posts-search/posts-search.component';
import { PostsSearchResultComponent } from './presentation/posts-search-result/posts-search-result.component';
import { RouterModule } from '@angular/router';
import { CommentModule } from '../comment/comment.module';

@NgModule({
	declarations: [
		PostsContainerComponent,
		PostsSearchComponent,
		PostsSearchResultComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: PostsContainerComponent
			}
		]),
		CommentModule
	],
	exports: [
		PostsContainerComponent,
		PostsSearchComponent,
		PostsSearchResultComponent
	]
})
export class PostsModule {}
