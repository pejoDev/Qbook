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
@Injectable()
export class PostsFeatureService {
	private unsubscribe$ = new Subject();

	constructor(
		private state: State<IPostsState>,
		private postsService: PostsService,
		private commentsService: CommentsService,
		private userService: UsersService
	) {}

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
			map(user => {
				return <IPostsState>{
					...postsInitialState,
					usersMeta: user
				};
			}),
			tap(state => {
				this.state.set(state);
			})
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
			searchResult: this.mapToSearchResultUi(searchResult)
		});
	};

	private noDataFound = () => {
		/*this.notificationService.showNotification(
			this.efitTranslationService.instant('no.data.found')
		);*/
	};

	mapToSearchResultUi(posts: IPost[]): IPostsSearchResultUi[] {
		return posts.map((post: IPost) => {
			const user = this.state.snapshot.usersMeta?.find((user: IUser) => {
				return user.id === post.userId;
			});
			return <IPostsSearchResultUi>{
				name: user ? user.name : '',
				username: user ? user.username : '',
				email: user ? user.email : '',
				postId: post.id,
				body: post.body,
				title: post.title
			};
		});
	}
}
