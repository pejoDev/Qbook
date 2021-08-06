import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';
import { CommentModule } from '../../comment/comment.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PostModule } from '../post/post.module';

@NgModule({
	declarations: [PostDetailsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: ':id',
				component: PostDetailsComponent
			}
		]),
		CommentModule,
		HttpClientModule,
		PostModule
	],
	exports: [PostDetailsComponent],
	providers: []
})
export class PostDetailsModule {}
