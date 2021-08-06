import { IPost } from 'src/app/data-access/posts/post.model';
import { IUser } from 'src/app/data-access/users/user.model';
import { IPostsSearchResultUi } from './presentation/posts-search-result/posts-search-result.ui.model';

export class PostsMapper {
	static fromResourcesToPostUiResult(
		user: IUser[],
		posts: IPost[]
	): IPostsSearchResultUi[] {
		return posts.map((post: IPost) => {
			const userPost = user.find((user: IUser) => {
				return user.id === post.userId;
			});
			return <IPostsSearchResultUi>{
				name: userPost ? userPost.name : '',
				username: userPost ? userPost.username : '',
				email: userPost ? userPost.email : '',
				postId: post.id,
				body: post.body,
				title: post.title
			};
		});
	}
}
