import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form! :FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:'',
    });
  }

  submit(){
    this.authService.login(this.form.getRawValue()).subscribe(
      (res:any)=>{
        if(res)
          this.authService.accessToken = res.accessToken;
          debugger
          AuthService.authEmitter.emit(true);
          console.log(this.authService.accessToken, "set TOken")
          this.router.navigate(['/'])
      }
    )
  }

}
