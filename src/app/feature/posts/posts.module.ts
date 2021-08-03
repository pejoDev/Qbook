import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './container/posts-container.component';
import { PostsSearchComponent } from './presentation/posts-search/posts-search.component';
import { PostsSearchResultComponent } from './presentation/posts-search-result/posts-search-result.component';
import { RouterModule } from '@angular/router';
import { CommentModule } from '../comment/comment.module';
import { CommentsService } from 'src/app/data-access/comments/comments.service';
import { PostsService } from 'src/app/data-access/posts/posts.service';
import { UsersService } from 'src/app/data-access/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { PostsFeatureService } from './posts-feature.service';

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
		CommentModule,
		HttpClientModule
	],
	exports: [
		PostsContainerComponent,
		PostsSearchComponent,
		PostsSearchResultComponent
	],
	providers: [CommentsService, PostsService, UsersService, PostsFeatureService]
})
export class PostsModule {}
