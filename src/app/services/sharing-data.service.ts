import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private readonly _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private readonly _idUserEventEmitter: EventEmitter<number> = new EventEmitter();

  private readonly _findUserByIdEventEmitter = new EventEmitter();

  private readonly _selectUserEventEmitter = new EventEmitter();

  private readonly _errorUserFormEventEmitter = new EventEmitter();

  private readonly _pageUsersEventEmitter = new EventEmitter();

  constructor(){}

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(){
    return this._findUserByIdEventEmitter;
  }

  get selectUserEventEmitter(){
    return this._selectUserEventEmitter;
  }
  
  get errorUserFormEventEmitter(){
    return this._errorUserFormEventEmitter;
  }

  get pageUsersEventEmitter(){
    return this._pageUsersEventEmitter;
  }
}
