import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	user: any = {};
	angForm: FormGroup;

  	constructor(private route: ActivatedRoute,  private router: Router, private userService: UserService, private fb: FormBuilder) { 
		this.createForm();
	}

  	ngOnInit() {
		this.route.params.subscribe(params => {
			this.userService.editUser(params['id']).subscribe(res => {
			  this.user = res[0];
		  });
		});
  	}

  	createForm() {
		this.angForm = this.fb.group({
			user_name: ['', Validators.required ]
		});
	}

	updateUser(user_name: String) {
		this.route.params.subscribe(params => {
		   this.userService.updateUser(user_name, params['id']);
		});
	}
}
