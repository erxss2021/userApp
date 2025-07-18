import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{
  

  users: User[] = [];
  paginator: any = {};


  constructor(private readonly userService: UserService,
    private readonly sharingData: SharingDataService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUserEvent();
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    });
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user =>{
      if(user.id > 0){
        this.userService.update(user).subscribe(
          {
            next: (userUpdated) => {
              this.users = this.users.map(u => (u.id == userUpdated.id) ? {... userUpdated} : u);
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });
               Swal.fire({
                title: "Updated!",
                text: "User update correct!",
                icon: "success"
              });
            },
            error: (err) => {
              if(err.status == 400){

                this.sharingData.errorUserFormEventEmitter.emit(err.error);
              }
              
            }
          });

      }else{
       
        this.userService.create(user).subscribe(
          {
            next: userNew => {
          
              console.log(user);
             
              this.users = [... this.users, {... userNew}];
               console.log('Antes de actualizar usuarios:', this.users);
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });

              Swal.fire({
                title: "Saved!",
                text: "User saved correct!",
                icon: "success"
              });
            },
            error: (err) =>{
              if(err.status == 400){
                this.sharingData.errorUserFormEventEmitter.emit(err.error)
              }
            }
          });
      }
      
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

          this.userService.delete(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], {skipLocationChange: true}).then( () => {
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });
            });
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

  pageUserEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }
}
