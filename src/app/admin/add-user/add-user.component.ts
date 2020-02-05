import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  selectedRole: string;
  selectedDepartment: string;

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', Validators.required]
      });
  }

  selectRights(event: any) {
    this.selectedRole = event.target.value;
  }

  selectDeparture(event: any) {
    this.selectedDepartment = event.target.value;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.f.username.value);
      console.log(this.f.password.value);
      console.log(this.selectedRole);

      this.authenticationService.register(this.f.username.value,this.f.password.value,this.selectedRole,this.f.name.value,this.f.lastName.value,this.selectedDepartment,this.f.address.value,this.f.phone.value).subscribe((reponse)=>{
      alert("Επιτυχής εγγραφή");

     });


      this.loading = false;
      this.loginForm.reset();

  }
}
