import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPostsSearchUi } from '../posts-search.ui.model';

@Injectable()
export class PostsOverviewFormService {
	private readonly NAME_CONTROL: any[] = [null];
	private readonly USERNAME_CONTROL: any[] = [null];
	private readonly EMAIL_CONTROL: any[] = [null];

	private readonly POSTS_OVERVIEW_GROUP = {
		name: this.NAME_CONTROL,
		username: this.USERNAME_CONTROL,
		email: this.EMAIL_CONTROL
	};

	private formGroup: FormGroup | undefined;

	constructor(private readonly formBuilder: FormBuilder) {}

	createFormGroup(): FormGroup {
		const formGroup = this.formBuilder.group(this.POSTS_OVERVIEW_GROUP);
		this.formGroup = formGroup;
		return formGroup;
	}

	get value(): IPostsSearchUi {
		return this.formGroup?.value;
	}

	set value(value: IPostsSearchUi) {
		this.formGroup?.setValue(value);
	}
}
