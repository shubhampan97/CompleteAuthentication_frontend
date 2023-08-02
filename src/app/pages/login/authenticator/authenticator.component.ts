import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  @Input('loginData') loginData = {
    id:0,
    img:''
  }
  form! :FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code:''
    });
  }

  submit(){
    const formData = this.form.getRawValue();
    const data = this.loginData;
    this.authService.authenticatorLogin({
      ...formData,
      ...data
    }).subscribe(
      (res:any)=>{
        debugger
        this.authService.accessToken = res.accessToken;
        AuthService.authEmitter.emit(true);
        this.router.navigate(['/'])
      }
    )
  }
}
