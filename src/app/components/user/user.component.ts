import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

  onRemoveUser(id: number): void{

    // const confirmRemove =  confirm('Estas seguro que desea eliminar?');
    this.idUserEventEmitter.emit(id);
    // if(confirmRemove){

    // }
  }

  onSelectedUser(user: User): void{
    this.selectedUserEventEmitter.emit(user);
  }

}
