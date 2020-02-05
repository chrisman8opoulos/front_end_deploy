import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Jwt } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
      let user = new User();
      user.username = username;
      user.password = password;
        return this.http.post<User>(`${environment.apiUrl}/authenticate`,user)
            .pipe(map(user => {
              console.log("user");
              console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(username: string, password: string, role: string, firstName: string, lastName: string, department: string, address: string, phone: string){
      let user = new User();
      user.username = username;
      user.password = password;
      user.role = role;
      user.firstName = firstName;
      user.lastName = lastName;
      user.department = department;
      user.address = address;
      user.phone = phone;
      console.log(user);
      return this.http.post<User>(`${environment.apiUrl}/register`,user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
