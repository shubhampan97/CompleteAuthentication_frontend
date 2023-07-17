import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated = false;
  constructor(private authService : AuthService, 
    private router : Router) { }

  ngOnInit(): void {
    AuthService.authEmitter.subscribe(isAuthenticated=>{
      debugger
      this.authenticated = isAuthenticated
    })
  }

  async logout(){
    this.authService.logout().subscribe(async ()=>{
      this.authService.accessToken = '';
      debugger
      AuthService.authEmitter.emit(false);
      this.router.navigate(["/login"])
    })
  }

}
