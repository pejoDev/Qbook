import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/data-access/comments/comment.model';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() comments$: Observable<IComment[]> | undefined;
	constructor() {}

	comments: IComment[] = [];

	ngOnInit(): void {
		this.comments$?.subscribe((comment: IComment[]) => {
			this.comments = comment;
		}); // add unsubscribe
	}
}
