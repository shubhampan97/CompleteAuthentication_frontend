import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static authEmitter = new EventEmitter<boolean>();
  accessToken= '';
  constructor(
    private http:HttpClient
  ) { }

  register(body : any){
    return this.http.post(`${environment.api}/register`,body)
  }

  login(body : any){
    return this.http.post(`${environment.api}/login`,body,{withCredentials:true})
  }

  refresh(){
    return this.http.post(`${environment.api}/refresh`,{},{withCredentials:true})
  }

  user(){
    return this.http.get(`${environment.api}/user`)
  }

  logout(){
    return this.http.post(`${environment.api}/logout`,{},{withCredentials:true})
  }
}
