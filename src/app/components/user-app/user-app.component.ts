import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{
  

  users: User[] = [];


  constructor(private readonly userService: UserService,
    private readonly sharingData: SharingDataService,
    private readonly router: Router
  ){
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user =>{
      if(user.id > 0){
        this.users = this.users.map(u => (u.id == user.id) ? {... user} : u);
      }else{
        this.users =[... this.users, {...user, id: new Date().getTime()}];
      }
      this.router.navigate(['/users'], {state: {users: this.users}})
      Swal.fire({
        title: "Saved!",
        text: "User saved correct!",
        icon: "success"
      });
    });
  }

  removeUser(): void{
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Are you sure you want to delete?",
        text: "Caution, the user will be removed from the system!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then( () => {
            this.router.navigate(['/users'], {state: {users: this.users}})
          });
          Swal.fire({
            title: "Deleted!",
            text: "User successfully deleted.",
            icon: "success"
          });
        }
      });
    });
  }
}
