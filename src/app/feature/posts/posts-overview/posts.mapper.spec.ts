import { IPost } from 'src/app/data-access/posts/post.model';
import { IUser } from 'src/app/data-access/users/user.model';
import { PostsMapper } from './posts.mapper';
import { IPostsSearchResultUi } from './presentation/posts-search-result/posts-search-result.ui.model';

describe('Test Post mapper', () => {
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
	it('fromResourcesToPostUiResult, given an empty collection.', () => {
		const usersEmpty: IUser[] = [];
		const postsEmpty: IPost[] = [];
		expect(
			PostsMapper.fromResourcesToPostUiResult(usersEmpty, postsEmpty)
		).toEqual([]);
	});

	it('from resource to UI model, given a collection of resources.', () => {
		const item1: IPostsSearchResultUi = {
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz',
			postId: 1,
			body: 'body result 1',
			title: 'title result 1'
		};
		const item2: IPostsSearchResultUi = {
			name: 'Ervin Howell',
			username: 'Antonette',
			email: 'Shanna@melissa.tv',
			postId: 2,
			body: 'body result 2',
			title: 'title result 2'
		};

		expect(PostsMapper.fromResourcesToPostUiResult(user, posts)).toEqual([
			item1,
			item2
		]);
	});
});
