import { Component, OnInit } from '@angular/core';
import User from '../Model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  	users: User[] = [];

	constructor(private userService: UserService) {
	}

	ngOnInit() {
		this.userService.getUsers().subscribe((res: User[]) => {
			this.users = res;
		});
		
	}

  	deleteUser(id) {
		this.userService.deleteUser(id).subscribe(res => {
			console.log('Deleted');
			//When an user is deleted, refresh all users.
			this.userService.getUsers().subscribe((res: User[]) => {this.users = res;});
		});
	}

}
