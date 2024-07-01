import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL: string = 'http://localhost:3000/api/';
  newUserAdded: Subject<User> = new Subject<User>();

  constructor(private _http: HttpClient ) { }

  addNewUser(newUser: User):Observable<any>{
    return this._http.post(`${this.API_URL}user/create`,newUser);
  }

  getAllUSers():Observable<any>{
    return this._http.get(`${this.API_URL}user/getUsers`);
  }

  deleteUser(userId: string):Observable<any>{
  return this._http.delete(`${this.API_URL}user/delete?id=${userId}`);
  }

  notifyNewUser(newUser: User){
    this.newUserAdded.next(newUser);
  }

}
