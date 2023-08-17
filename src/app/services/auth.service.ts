import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;

  users = [{
    username:'admin',
    email: 'admin@example.com',
    password:'Admin@1'
  }]

  constructor(private http:HttpClient) {}

  isLogged() {
    if(this.user){
      console.log(this.user)
      return true;
    }
    else
    return false
  }

  logIn(user:any) {
    if (user){
      this.user = user
      console.log("logged in")
    }
    else 
      return
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users').pipe(
      tap(async (res) => {
        console.log(res)
      })
    )
  }

  getUsersById(id: number): Observable<any> {
    return this.http.get<any>('api/users/' + id)
  }

  getUsersByEmail(email: string): any {
    return this.users.find(user => user.email === email)
  }

  addUser(user:any): Observable<any> {
    return this.http.post<any>('api/users', user,this.httpOptions)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>('api/users/' + id,this.httpOptions)
  }
}
