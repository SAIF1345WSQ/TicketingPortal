import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error?.message ||
      error.message ||
      'Something went wrong';
    return throwError(() => new Error(msg));
  }

  private Loginurl = 'https://localhost:7017/api/Login/LoginAuht';

  Login(Loginmodel: any): Observable<any> {
    return this.http.post(this.Loginurl, Loginmodel);
  }
  
}
