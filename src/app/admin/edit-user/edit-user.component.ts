import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { AuthenticationService } from '@app/_services';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  idCurrent: number;
  selectedRole: string;
  selectedDepartment: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }


  selectRights(event: any) {
    this.selectedRole = event.target.value;
  }

  selectDeparture(event: any) {
    this.selectedDepartment = event.target.value;
  }

  ngOnInit() {
    let sub = this.route
      .queryParams
      .subscribe(params => {
        // this.page = +params['serviceId'] || 0;
        this.idCurrent = params['serviceId'];
      });

    let user = new User();
    user.id = this.idCurrent;
    console.log(user);
    this.userService.getUserById(user)
      .subscribe(data => {
        this.selectedRole = data.role;
        this.selectedDepartment = data.department;
        console.log(data);
        this.editForm = this.formBuilder.group({
          id: [data.id],
          username: [data.username, Validators.required],
          password: ["****", Validators.required],
          firstName: [data.firstName, Validators.required],
          department: [data.department, Validators.required],
          role: [data.role, Validators.required],
          lastName: [data.lastName, Validators.required],
          address: [data.address, Validators.required],
          phone: [data.phone, Validators.required]
        });
      });
  }

  onSubmit() {
    let values = this.editForm.value
    console.log(values);

    let user = new User();
    user.id = values.id;
    user.password = values.password;
    user.username = values.username;
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.address = values.address;
    user.phone = values.phone;
    user.role = this.selectedRole;
    user.department = this.selectedDepartment;
    console.log(user);
    this.userService.updateUser(user)
      .subscribe(
        data => {
          console.log(data);
          if(data) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          }else {
            alert(data);
          }
        },
        error => {
          alert(error);
        });
  }

}
