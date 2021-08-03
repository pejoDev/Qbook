import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentsService } from '../../data-access/comments/comments.service';
import { PostsService } from '../../data-access/posts/posts.service';
import { IPostsSearchResultUi } from './presentation/posts-search-result/posts-search-result.ui.model';
import { map, take, tap } from 'rxjs/operators';
import { IPost } from '../../data-access/posts/post.model';
import { IComment } from '../../data-access/comments/comment.model';
import { UsersService } from '../../data-access/users/users.service';
import { IUser } from '../../data-access/users/user.model';
import { IPostsState, postsInitialState } from './posts-state.model';
import { State } from 'src/app/utils/state-management/state';
import { IPostsSearchUi } from './presentation/posts-search/posts-search.ui.model';
@Injectable({
	providedIn: 'any'
})
export class PostsFeatureService {
	private unsubscribe$ = new Subject();

	constructor(
		private state: State<IPostsState>,
		private postsService: PostsService,
		private commentsService: CommentsService,
		private userService: UsersService
	) {}

	/*get searchResult$(): Observable<IPost[]> {
		return this.postsService.getPosts().pipe(
			map((post: IPost[]) => {
				return post;
			})
		);
	}*/
	get searchResult$(): Observable<IPostsSearchResultUi[]> {
		return this.state.select(
			state => <IPostsSearchResultUi[]>state?.searchResult
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

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	init(): Observable<IPostsState> {
		return this.state.snapshot === null
			? this.loadUsers()
			: this.state.select(state => state);
	}

	search(values: IPostsSearchUi): void {
		this.updateStateAndSearch({
			searchValues: { ...this.state.snapshot.searchValues, ...values }
		});
	}

	public loadUsers(): Observable<IPostsState> {
		return this.userService.getUsers().pipe(
			map(
				user =>
					<IPostsState>{
						...postsInitialState,
						usersMeta: user
					}
			),
			tap(defaults => this.state.set(defaults))
		);
	}

	private updateStateAndSearch(searchState: Partial<IPostsState>): void {
		this.state.set(searchState);
		this.executeSearch();
	}

	private executeSearch(): void {
		// add loader or spiner this.loaderService.start();
		this.postsService
			.getPosts()
			.pipe(take(1))
			.subscribe(
				searchResult => {
					this.onSearchNext(searchResult);
				},
				error => {
					throw error;
				}
				// () => stop loader this.loaderService.stop()
			);
	}

	private onSearchNext = (searchResult: IPost[]): void => {
		this.state.set({
			searchResult: this.mapToSearchResultUi(
				<IUser[]>this.state.snapshot.usersMeta,
				searchResult
			)
		});
	};

	private noDataFound = () => {
		/*this.notificationService.showNotification(
			this.efitTranslationService.instant('no.data.found')
		);*/
	};

	mapToSearchResultUi(users: IUser[], posts: IPost[]): IPostsSearchResultUi[] {
		return posts.map((post: IPost) => {
			const user = users.find((user: IUser) => {
				return (user.id = post.userId);
			});
			console.log('finded user', user);
			return <IPostsSearchResultUi>{
				name: user ? user.name : null,
				username: user ? user.username : null,
				email: user ? user.email : null,
				body: post.body,
				title: post.title
			};
		});
	}
}
