import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsSearchResultUi } from './presentation/posts-search-result/posts-search-result.ui.model';
import { map, take, tap } from 'rxjs/operators';
import { IPostsState, postsInitialState } from './posts-state.model';
import { State } from 'src/app/utils/state-management/state';
import { IPostsSearchUi } from './presentation/posts-search/posts-search.ui.model';
import { UsersService } from 'src/app/data-access/users/users.service';
import { PostsService } from 'src/app/data-access/posts/posts.service';
import { IUser } from 'src/app/data-access/users/user.model';
import { IPost } from 'src/app/data-access/posts/post.model';
import { PostsMapper } from 'src/app/feature/posts/posts-overview/posts.mapper';

@Injectable({ providedIn: 'root' })
export class PostsFeatureService {
	constructor(
		private state: State<IPostsState>,
		private postsService: PostsService,
		private userService: UsersService
	) {}

	get searchResult$(): Observable<IPostsSearchResultUi[]> {
		return this.state.select(
			state => <IPostsSearchResultUi[]>state?.searchResult
		);
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
		this.state.snapshot.searchResult?.length
			? this.state.set({
					searchResult: this.mapToSearchResultUi()
			  })
			: this.postsService
					.getPosts()
					.pipe(take(1))
					.subscribe(
						posts => {
							this.state.set({
								searchResult: this.mapToSearchResultUi(posts),
								posts: posts
							});
						},
						error => {
							throw error;
						}
					);
	}

	mapToSearchResultUi(posts?: IPost[]): IPostsSearchResultUi[] {
		return PostsMapper.fromResourcesToPostUiResult(
			<IUser[]>this.state.snapshot.usersMeta,
			posts ? posts : <IPost[]>this.state.snapshot.posts
		)
			.filter((searchResult: IPostsSearchResultUi) => {
				return searchResult.name
					? searchResult.name
							.toLowerCase()
							.includes(
								<string>this.state.snapshot?.searchValues?.name?.toLowerCase()
							)
					: true;
			})
			.filter((searchResult: IPostsSearchResultUi) => {
				return searchResult.username
					? searchResult.username
							.toLowerCase()
							.includes(
								<string>(
									this.state.snapshot?.searchValues?.username?.toLowerCase()
								)
							)
					: true;
			})
			.filter((searchResult: IPostsSearchResultUi) => {
				return searchResult.email
					? searchResult.email
							.toLowerCase()
							.includes(
								<string>this.state.snapshot?.searchValues?.email?.toLowerCase()
							)
					: true;
			});
	}
}
