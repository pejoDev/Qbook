import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.model';

@Injectable()
export class UsersService {
	private readonly url = 'https://my-json-server.typicode.com/pejoDev/Qbook';

	constructor(private httpClient: HttpClient) {}
	/**
	 * Function for getting all of available users
	 */
	getUsers(): Observable<IUser[]> {
		return this.httpClient.get<IUser[]>(`${this.url}/user`); //TODO: change for users in db.json
	}
	/**
	 * Function for getting user by user id
	 */
	getUserById(userId: number): Observable<IUser> {
		return this.httpClient.get<IUser>(`${this.url}/user/${userId}`);
	}
}
