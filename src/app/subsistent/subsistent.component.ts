import { Component, OnInit,OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';


@Component({
  selector: 'app-subsistent',
  templateUrl: './subsistent.component.html',
  styleUrls: ['./subsistent.component.less']
})
export class SubsistentComponent implements OnInit,OnChanges {

  users: User[];
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getOnlyUsers()
      .subscribe(data => {
        this.users = data;
        console.log(data);
      });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.userService.getOnlyUsers()
      .subscribe(data => {
        this.users = data;
        console.log(data);
      });
 }

  activeUser(user: User){
    console.log(user);
    this.userService.activateUsers(user).subscribe(data => {
        alert("Φοιτητής Ενεργοποιήθηκε");
         this.ngOnInit();
      });
  }

  dActiveUser(user: User){
    console.log(user);
    this.userService.dActivateUsers(user).subscribe(data => {
        alert("Φοιτητής Απενεργοποίηση");
         this.ngOnInit();
      });
  }

}
