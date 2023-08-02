import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output('onLogin') onLogin = new EventEmitter();
  form! :FormGroup;
  user!: SocialUser;
  loggedIn!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private authService: AuthService,
    private socialAuthService : SocialAuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:'',
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      this.authService.googleLogin({
        token:user.idToken
      }).subscribe((res:any)=>{
        this.authService.accessToken = res.accessToken;
        AuthService.authEmitter.emit(true);
        this.router.navigate(['/'])
      })
    });
  }

  submit(){
    this.authService.login(this.form.getRawValue()).subscribe(
      (res:any)=>this.onLogin.emit(res)
    )
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleUser=>{
      console.log(googleUser);
    })
  }
}
