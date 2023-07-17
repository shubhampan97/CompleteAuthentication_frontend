import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message='Hello';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(res:any)=>{
        debugger
          this.message = `${res.first_name} ${res.last_name} currently logged in`
          AuthService.authEmitter.emit(true);
        },
      error:(err:any)=>{
        debugger
        this.message = `You are not authenticated`
        AuthService.authEmitter.emit(false);
      }
    })
  }

}
