import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { Application } from '@app/_models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  homeForm: FormGroup;
  active: boolean;
  selectedNotWorking: number;
  loading = false;
  submitted = false;
  username: string;
  firstName: string;
  lastName: string;
  selectedDepartment: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.active = obj['activate'];
    this.firstName =  obj['firstName'];
    this.lastName =  obj['lastName'];
    this.selectedDepartment = obj['department'];
    console.log(obj['activate']);
  }

  get f() { return this.homeForm.controls; }

  ngOnInit() {
    this.homeForm = this.formBuilder.group({
        income: ['', Validators.required],
        childOut: ['', Validators.required],
        childIn: ['', Validators.required],
        years: ['', Validators.required],
        yearsStudy: ['', Validators.required]
    });
  }

  selectChangeHandler (event: any) {
    this.selectedNotWorking = event.target.value;
  }

  onSubmit() {
      this.submitted = true;

      if (this.homeForm.invalid) {
          return;
      }

      this.loading = true;
      if (!this.isNumeric(this.f.income.value)){
      alert("Εισόδημα Δεν ειναι αριθμός");
      }
      else if(!this.isNumeric(this.f.childOut.value))
      {
      alert("Αριθμος αδερφοιωνστην ιδια πολη Δεν ειναι αριθμός");
      }
      else if(!this.isNumeric(this.f.childIn.value))
      {
      alert("Αριθμος αδερφοιων άλλη πόλη Δεν ειναι αριθμός");
      }
      else if(!this.isNumeric(this.f.years.value))
      {
      alert("έτοι διαμονείς στις εστίες! Δεν ειναι αριθμός");
      }
      else if(!this.isNumeric(this.f.yearsStudy.value))
      {
      alert("Ετος φοιτησεις! Δεν ειναι αριθμός");
      }
      else
      {
        let request = new Application();
        request.income = this.f.income.value;
        request.brothersAnotherCity = this.f.childOut.value;
        request.brothersSameCity = this.f.childIn.value;
        request.yearHome = this.f.years.value;
        request.notJob = this.selectedNotWorking;
        request.yearStudy = this.f.yearsStudy.value;
        request.department = this.selectedDepartment;
        request.firstName = this.firstName;
        request.lastName = this.lastName;
        console.log(request);
        this.userService.requestRegister(request).subscribe((data)=>{
          console.log(data);
          if(data) {
            alert('User updated successfully.');
          }else {
            alert(data);
          }
        });
      }
      this.loading = false;
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

}
