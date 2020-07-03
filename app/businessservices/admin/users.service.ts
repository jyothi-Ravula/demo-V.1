import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
 
import { User} from '@/businessclasses/admin/User';
import {Constants} from '../../app.constants';

 @Injectable({  
  providedIn: 'root'  
})  
  
export class UserScreenService {
  //To connect with server.   
  url =  Constants.HOST_URL;

  //Constructor.
  constructor(private http: HttpClient) { }
 
  //To get all users.
  getAllUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.url + '/User/GetAllUsers/');
  }  

  //To get by user Id.
  getUserById(id: string) { 
    return this.http.get<User>(this.url + '/User/GetUserById/' + id);  
  } 

  // To create new user.
  createUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<User>(this.url + '/User/AddUser/', user, httpOptions);  
  } 

  // To update user.
  updateUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<User>(this.url + '/User/UpdateUser/', user, httpOptions); 
  }

  
   //To validate user name in domain
   ValidateUserInDomain(userName): Observable<User> { 
    return this.http.get<User>(this.url + '/User/ValidateUserInDomain/'+userName);
  }  

  // To get domain name
  GetDomainName():Observable<string>{
    return this.http.get<string>(this.url + '/User/GetDomainName/');
  }
}  
