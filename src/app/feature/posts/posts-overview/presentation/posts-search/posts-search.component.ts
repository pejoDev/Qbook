import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-posts-search',
	templateUrl: './posts-search.component.html',
	styleUrls: ['./posts-search.component.scss']
})
export class PostsSearchComponent implements OnInit {
	@Input()
	form!: FormGroup;

	@Output() search = new EventEmitter<void>();
	constructor() {}

	ngOnInit(): void {}
}
