import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class State<R> {
	private state = new BehaviorSubject<R>(null as unknown as R); // null

	constructor() {}

	get snapshot(): R {
		return this.state.getValue();
	}

	select<K>(mapFn: (state: R) => K): Observable<K> {
		return this.state.asObservable().pipe(
			map((state: R) => mapFn(state)),
			distinctUntilChanged()
		);
	}

	set(newState: Partial<R>): void {
		const nextState = {
			...this.snapshot,
			...newState
		};

		this.state.next(nextState);
	}

	reset(newState?: R): void {
		newState
			? this.state.next({ ...newState })
			: this.state.next(null as unknown as R);
	}
}
