import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Application } from '@app/_models';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {

  token: string;

  constructor(private http: HttpClient) {
    let obj = JSON.parse(localStorage.getItem('currentUser'));
    console.log(obj);
    this.token = obj['token'];
  }

  requestRegister(request: Application): Observable<any> {
    // let obj = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(obj);
    // let token = obj['token'];
    // console.log(token);

    return this.http.post(`${environment.apiUrl}/request`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/admin/getusers`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/register`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/delete`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/modify`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getUserById(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/getuser`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getOnlyUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/subsistent/getusers`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  activateUsers(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/subsistent/activateuser`,user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  dActivateUsers(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/subsistent/dactivateuser`,user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  getRequest(request: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.apiUrl}/supervisior/getrequest/`+request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  activateRequest(request: Application): Observable<Application[]> {
    return this.http.post<Application[]>(`${environment.apiUrl}/supervisior/activaterequest`,request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

  dActivateRequest(request: Application): Observable<Application[]> {
    return this.http.post<Application[]>(`${environment.apiUrl}/supervisior/dactivaterequest`,request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    });
  }

}
