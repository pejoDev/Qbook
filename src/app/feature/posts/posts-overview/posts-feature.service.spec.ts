import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsFeatureService } from './posts-feature.service';
import { UsersService } from 'src/app/data-access/users/users.service';
import { IUser } from 'src/app/data-access/users/user.model';
import { of } from 'rxjs';
import { State } from 'src/app/utils/state-management/state';
import { IPostsState } from './posts-state.model';
import { IPostsSearchUi } from './presentation/posts-search/posts-search.ui.model';
import { IPost } from 'src/app/data-access/posts/post.model';
import { PostsService } from 'src/app/data-access/posts/posts.service';
fdescribe('PostsService', () => {
	let service: PostsFeatureService;

	const user = <IUser[]>[
		{
			id: 1,
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz',
			address: {
				street: 'Kulas Light',
				suite: 'Apt. 556',
				city: 'Gwenborough',
				zipcode: '92998-3874',
				geo: {
					lat: '-37.3159',
					lng: '81.1496'
				}
			},
			phone: '1-770-736-8031 x56442',
			website: 'hildegard.org',
			company: {
				name: 'Romaguera-Crona',
				catchPhrase: 'Multi-layered client-server neural-net',
				bs: 'harness real-time e-markets'
			}
		},
		{
			id: 2,
			name: 'Ervin Howell',
			username: 'Antonette',
			email: 'Shanna@melissa.tv',
			address: {
				street: 'Victor Plains',
				suite: 'Suite 879',
				city: 'Wisokyburgh',
				zipcode: '90566-7771',
				geo: {
					lat: '-43.9509',
					lng: '-34.4618'
				}
			},
			phone: '010-692-6593 x09125',
			website: 'anastasia.net',
			company: {
				name: 'Deckow-Crist',
				catchPhrase: 'Proactive didactic contingency',
				bs: 'synergize scalable supply-chains'
			}
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: []
		});
		service = TestBed.inject(PostsFeatureService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('loadUsers should set the user meta in the state', done => {
		const userService = TestBed.inject(UsersService);

		spyOn(userService, 'getUsers').and.returnValue(of(user));

		service.loadUsers().subscribe(state => {
			expect(state?.usersMeta).toEqual(user);
			done();
		});
	});

	it('search should update state before executing search', () => {
		const state = TestBed.inject(State);
		state.set(<IPostsState>{
			searchValues: {
				name: '',
				username: '',
				email: ''
			}
		});

		const searchValues = <IPostsSearchUi>{
			name: 'User name',
			username: 'User username',
			email: 'User email'
		};

		service.search(searchValues);

		const expectedStateBeforeExecutingSearch = <IPostsState>{
			searchValues: {
				name: 'User name',
				username: 'User username',
				email: 'User email'
			}
		};

		expect(state.snapshot).toEqual(expectedStateBeforeExecutingSearch);
	});

	it('search should update state, after searching, with the mapped search results', () => {
		const state = TestBed.inject(State);

		const userService = TestBed.inject(UsersService);

		spyOn(userService, 'getUsers').and.returnValue(of(user));

		service.loadUsers().subscribe(state => {
			expect(state?.usersMeta).toEqual(user);
		});
		state.set(<IPostsState>{
			searchValues: {
				name: '',
				username: '',
				email: ''
			},
			usersMeta: user
		});

		const posts = <IPost[]>[
			{
				id: 1,
				userId: 1,
				title: 'title result 1',
				body: 'body result 1'
			},
			{
				id: 2,
				userId: 2,
				title: 'title result 2',
				body: 'body result 2'
			}
		];
		const postsService = TestBed.inject(PostsService);
		spyOn(postsService, 'getPosts').and.returnValue(of(posts));
		const searchResult = service.mapToSearchResultUi(posts);
		service.search({
			name: '',
			username: '',
			email: ''
		});
		const expectedStateAfterExecutingSearch = <IPostsState>{
			searchValues: {
				name: '',
				username: '',
				email: ''
			},
			usersMeta: user,
			searchResult: searchResult,
			posts: posts
		};
		expect(state.snapshot).toEqual(expectedStateAfterExecutingSearch);
	});
});
