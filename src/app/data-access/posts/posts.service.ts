import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
	private readonly url = 'https://my-json-server.typicode.com/pejoDev/Qbook';

	constructor(private httpClient: HttpClient) {}
	/**
	 * Function for getting all of available posts
	 */
	getPosts(): Observable<IPost[]> {
		return this.httpClient.get<IPost[]>(`${this.url}/posts`);
	}
	/**
	 * Function for getting post by post id
	 */
	getPostById(postId: number): Observable<IPost> {
		return this.httpClient.get<IPost>(`${this.url}/posts/${postId}`);
	}
}
