import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticate: Boolean = false;
  User: any = null;

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.todosUrl).pipe(
      tap(_ => this.log('fetched profile')),
      catchError(this.handleError<any>('getprofile', [])),
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': `${localStorage.getItem('token')}`,
    }),
  };

  /** POST: add a new todo to the server */
  signUp(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.todosUrl}/signup`, userData, this.httpOptions)
      .pipe(
        tap((authToken: any) => {
          this.log(`added user w/ id=${authToken}`);
          console.log(authToken);
        }),
        catchError(this.handleError<any>('addUser')),
      );
  }
  signIn(authUser: any): Observable<any> {
    return this.http
      .post<any>(`${this.todosUrl}/login`, authUser, this.httpOptions)
      .pipe(
        tap((authToken: any) => {
          this.log(`authenticated user w/ id=${authToken}`);
          console.log(authToken);
        }),
        catchError(this.handleError<any>('authUser')),
      );
  }

  getUser(): Observable<any> {
    console.log(localStorage.getItem('token'));
    console.log('Auth Options', this.authOptions);
    return this.http.get<any>(`${this.todosUrl}/me`, this.authOptions).pipe(
      tap((userData: any) => {
        this.log(`authenticated user data=${userData}`);
        this.User=userData;
        this.isAuthenticate=true
      }),
      catchError(this.handleError<any>('authUser')),
    );
  }

  private todosUrl = 'http://localhost:3000/api';

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}
}
