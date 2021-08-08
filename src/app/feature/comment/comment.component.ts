import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/data-access/comments/comment.model';
import { CommentsService } from 'src/app/data-access/comments/comments.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() postId!: number;
	constructor(private commentsService: CommentsService) {}

	comments: IComment[] = [];

	ngOnInit(): void {
		this.getPostComments();
	}

	getPostComments(): void {
		this.commentsService
			.getCommentByPostId(this.postId as number)
			.subscribe((comments: IComment[]) => {
				this.comments = comments;
			});
	}
}
