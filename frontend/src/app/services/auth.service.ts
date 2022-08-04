import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private router: Router,
              private http: HttpClient) { }

    login(username: string, password: string) {
      return new Promise((resolve, reject) => {
        this.http.post(
          'http://localhost:3000/api/auth/login',
          { username: username, password: password })
          .subscribe(
            (authData: { token: string, userId: string }) => {
              this.token = authData.token;
              this.userId = authData.userId;
              this.isAuth$.next(true);
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      });
    }

    logout() {
      this.isAuth$.next(false);
      this.userId = null;
      this.token = null;
    }
}
