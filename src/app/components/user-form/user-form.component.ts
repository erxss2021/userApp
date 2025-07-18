import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{

    user: User;
    errors: any = {};

   constructor(
    private readonly sharingData: SharingDataService,
    private readonly route: ActivatedRoute,
    private readonly service: UserService
    
   ){
    this.user = new User();
   }

  ngOnInit(): void {

    this.sharingData.errorUserFormEventEmitter.subscribe(errors => this.errors = errors);

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number =  +(params.get('id') || '0');
      if(id > 0){
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

   onSubmit(userForm: NgForm): void{
    this.sharingData.newUserEventEmitter.emit(this.user);
    console.log(this.user);
   }

   onClear(userForm: NgForm): void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
   }


}
