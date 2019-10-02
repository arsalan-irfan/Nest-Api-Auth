import { Component, OnInit } from '@angular/core';
import {User} from '../user'
import { FormControl } from '@angular/forms';
import {AuthService} from '../../auth.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User;
  name = new FormControl();
  pwd = new FormControl();
  email = new FormControl();
  cpwd = new FormControl();
  error:any;

  async onFormSubmit(){
    let name=this.name.value;
    let password=this.pwd.value;
    let cpwd=this.cpwd.value;
    let email=this.email.value;

    if(password===cpwd){
      let newUser={name,password,email};
      await this.authService.signUp(newUser)
      .subscribe(token=>{
        console.log(token);
      }) 
    }

    else{
      this.setAlert("Passwords Not Matched !","danger")
    }
  }
  async setAlert(msg,type){
    this.error={msg,type};
    await setTimeout(()=>{ this.error=null; }, 3000);
  }

  constructor(
    private authService:AuthService
    ) {}

  ngOnInit() {
  }

}
