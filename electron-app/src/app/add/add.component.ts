import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	angForm: FormGroup;
	constructor(private fb: FormBuilder, private userService: UserService) {
		this.createForm();
	}

  	createForm() {
		this.angForm = this.fb.group({
			user_name: ['', Validators.required ]
		});
  	}

	addUser(user_name: String) {
		this.userService.addUser(user_name);
	}

	ngOnInit() {
	}
}
