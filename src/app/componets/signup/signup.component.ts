import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  signuPForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void{
    
    this.signuPForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUP(){ 
    if(this.signuPForm.valid){
       // perform logic for signup
       this.auth.signUp(this.signuPForm.value)
       .subscribe({
        next:(res =>{
          alert(res.message);
          this.signuPForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err =>{
          alert(err?.error.message)
        })
       })
     
    }else{
     
      // logic for throwing error
      ValidateForm.validateAllFormFields(this.signuPForm);
      
    }
  }

 
}
