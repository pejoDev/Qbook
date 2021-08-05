import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';
import { PostsFeatureService } from '../posts-feature.service';
import { CommentModule } from '../../comment/comment.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [PostDetailsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'details',
				component: PostDetailsComponent
			}
		]),
		CommentModule,
		HttpClientModule
	],
	exports: [PostDetailsComponent],
	providers: []
})
export class PostDetailsModule {}
