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
	},
	{
		path: 'error-page',
		loadChildren: () =>
			import('./feature/error-page/error-page.module').then(
				m => m.ErrorPageModule
			)
	},
	{
		path: '**',
		redirectTo: 'error-page',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
