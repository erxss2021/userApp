import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Eloy',
      lastname: 'Sanchez',
      email: 'salmoran@gmail.com',
      username: 'erxss',
      password: '12345'
    },
     {
      id: 2,
      name: 'Bingo',
      lastname: 'Sanchez',
      email: 'bingo@gmail.com',
      username: 'bingo',
      password: '12345'
    },
  ]
  constructor(){}

  findAll(): Observable<User[]>{
    return of(this.users);
  }
  
}
