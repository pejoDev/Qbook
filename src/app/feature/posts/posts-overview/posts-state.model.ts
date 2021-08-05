import { IUser } from 'src/app/data-access/users/user.model';
import { IPostsSearchResultUi } from './presentation/posts-search-result/posts-search-result.ui.model';
import { IPostsSearchUi } from './presentation/posts-search/posts-search.ui.model';

export interface IPostsState {
	searchValues?: IPostsSearchUi;
	searchResult?: IPostsSearchResultUi[];
	usersMeta?: IUser[];
}

export const postsInitialState: IPostsState = {
	searchValues: {
		name: '',
		username: ',',
		email: ''
	},
	searchResult: [],
	usersMeta: []
};
