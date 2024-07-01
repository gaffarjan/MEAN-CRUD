import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  userForm!: FormGroup;

  constructor( private fb: FormBuilder, private _userService: UserService, private dialogref: MatDialogRef<AddUsersComponent>){
    this.createUserForm();
   }

   createUserForm(){
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }
       
   submitForm(){
    if(this.userForm.valid){
      const newUser:User = this.userForm.value;
      this._userService.addNewUser(newUser).subscribe({
        next: (response: any) => {
          if(response.isSuccess){
            this._userService.notifyNewUser(response.data);
          }
        },
        error: (errors) => {
          console.log(errors);
        },
        complete: ()=>{
          this.dialogref.close();
        }
      });
    }else{
      alert('Form is invalid');
    }
    
   }
}
