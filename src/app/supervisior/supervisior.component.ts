import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';
import { Application } from '@app/_models';

@Component({
  selector: 'app-supervisior',
  templateUrl: './supervisior.component.html',
  styleUrls: ['./supervisior.component.less']
})
export class SupervisiorComponent implements OnInit {

  depart1: Application [];
  depart2: Application [];
  depart3: Application [];
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.userService.getRequest('1')
      .subscribe(data => {
        this.depart1 = data;
        console.log(data);
      });
    this.userService.getRequest('2')
      .subscribe(data => {
        this.depart2 = data;
        console.log(data);
      });
    this.userService.getRequest('3')
      .subscribe(data => {
        this.depart3 = data;
        console.log(data);
      });
  }

  activeRequest(request: Application){
    this.userService.activateRequest(request).subscribe(data => {
      console.log(data);
        alert("Φοιτητής Εγκρηθηκε");
         this.ngOnInit();
      });
  }

  dActiveRequest(request: Application){
    this.userService.dActivateRequest(request).subscribe(data => {
        alert("Φοιτητής Εγκρηθηκε");
         this.ngOnInit();
      });
  }

}
