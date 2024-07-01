import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { UserService } from './services/user.service';
import { User } from './models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-CRUD';
  Users!: User[];

  constructor(private dialog: MatDialog, private _userService: UserService){ }
  ngOnInit(): void {
    this._userService.newUserAdded.subscribe((response:User)=>{
      this.Users.push(response);
    })
    this.getUsers();
  }

  getUsers(){
    this._userService.getAllUSers().subscribe({
      next: (response: any)=>{
        if(response){
          this.Users = response.data;
        }
      },
      error: (error)=>{
        console.log(error);
      },
      complete: ()=>{
        console.log('complete');
      }
     });
  }

  deleteUser(userId: string){
    this._userService.deleteUser(userId).subscribe((response)=>{
      console.log(response);
      
    })
  }

  openNewUserDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '450px';
    const newUserDialog = this.dialog.open(AddUsersComponent, dialogConfig);
  }
}
