import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'posts'
	},
	{
		path: 'posts',
		loadChildren: () =>
			import('./feature/posts/posts-overview/posts.module').then(
				m => m.PostsModule
			)
	},
	{
		path: 'post',
		loadChildren: () =>
			import('./feature/posts/post-details/post-details.module').then(
				m => m.PostDetailsModule
			)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
