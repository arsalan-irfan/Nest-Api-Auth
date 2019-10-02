import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AuthService} from '../../auth.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  pwd = new FormControl();
  email = new FormControl();
  error:any;

  async onFormSubmit(){
    let password=this.pwd.value;
    let email=this.email.value;

    let authUser={email,password};
    await this.authService.signIn(authUser)
    .subscribe(authRes=>{
      if(authRes.statusCode!==200){
        this.setAlert("Invalid Email Password","danger");  
      }
      console.log(authRes);
    }) 
  }

  async setAlert(msg,type){
    this.error={msg,type};
    await setTimeout(()=>{ this.error=null; }, 3000);
  }
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
