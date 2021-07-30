import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from './comment.model';

@Injectable()
export class CommentsService {
	private readonly url = 'https://my-json-server.typicode.com/pejoDev/Qbook';

	constructor(private httpClient: HttpClient) {}
	/**
	 * Function for getting all of available comments
	 */
	getComments(): Observable<IComment[]> {
		return this.httpClient.get<IComment[]>(`${this.url}/comments`);
	}
	/**
	 * Function for getting comment by comment id
	 */
	getCommentById(commentId: number): Observable<IComment> {
		return this.httpClient.get<IComment>(`${this.url}/comments/${commentId}`);
	}
}
