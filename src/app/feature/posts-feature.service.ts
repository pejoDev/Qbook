import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CommentsService } from '../data-access/comments/comments.service';
import { PostsService } from '../data-access/posts/posts.service';
import { IPostsSearchResultUi } from './posts/presentation/posts-search-result/posts-search-result.ui.model';
import { map, mergeMap } from 'rxjs/operators';
import { IPost } from '../data-access/posts/post.model';
import { IComment } from '../data-access/comments/comment.model';
import { UsersService } from '../data-access/users/users.service';
import { IUser } from '../data-access/users/user.model';
@Injectable({
	providedIn: 'any'
})
export class PostsFeatureService {
	constructor(
		private postsService: PostsService,
		private commentsService: CommentsService,
		private userService: UsersService
	) {}

	get searchResult(): Observable<IPost[]> {
		return this.postsService.getPosts().pipe(
			map((post: IPost[]) => {
				return post;
			})
		);
	}

	getPostComments(postId: number): Observable<IComment[]> {
		return this.commentsService.getCommentByPostId(postId);
	}

	getUserById(userId: number): Observable<IUser> {
		return this.userService.getUserById(userId);
	}

	mapToSearchResult(user: IUser, post: IPost): IPostsSearchResultUi {
		return <IPostsSearchResultUi>{
			name: user.name,
			username: user.username,
			email: user.email,
			body: post.body,
			title: post.title
		};
	}
}
