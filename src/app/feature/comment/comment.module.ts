import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { CommentsService } from 'src/app/data-access/comments/comments.service';

@NgModule({
	declarations: [CommentComponent],
	imports: [CommonModule],
	exports: [CommentComponent],
	providers: [CommentsService]
})
export class CommentModule {}
