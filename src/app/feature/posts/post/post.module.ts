import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { CommentModule } from '../../comment/comment.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [PostComponent],
	imports: [CommonModule, CommentModule, RouterModule],
	exports: [PostComponent]
})
export class PostModule {}
