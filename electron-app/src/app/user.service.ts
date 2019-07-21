import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  	BASE_URL : string = 'http://localhost:4000';

  	constructor(private router: Router, private http: HttpClient) { }

  	addUser(user_name) {
		const obj = {
			user_name: user_name
		};
		this.http.post(this.BASE_URL + '/user/add', obj).subscribe(res => {
			console.log(res, 'Done')
			this.router.navigate(['/']);
		});
  	}

  	getUsers() {return this.http.get(this.BASE_URL + '/user/');}

  	editUser(id) {return this.http.get(this.BASE_URL + '/user/edit/' + id);}
	  
	updateUser(user_name, id) {
		const obj = {
			user_name: user_name
		};
		this.http.put(this.BASE_URL + '/user/update/' + id, obj).subscribe(res => {
			console.log('Done')
			this.router.navigate(['user']);
		});
	}
	deleteUser(id) {
		return this.http.delete(this.BASE_URL + '/user/delete/' + id);
	}
}
