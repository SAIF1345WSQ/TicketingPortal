import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminPanelService {

  private apiUrl = 'https://localhost:7017/api/AdminPanel/SaveCompany';
  private EmpUpdateUrl = 'https://localhost:7017/api/AdminPanel/UpdateEmployee';
  private EmpapiUrl = 'https://localhost:7017/api/AdminPanel/GetEmpMaster';
  private SaveEmpUrl = 'https://localhost:7017/api/AdminPanel/SaveEmpMaster';
  private ChekcCcodeUrl = 'https://localhost:7017/api/AdminPanel/ChekcCcode';
  private GetCompanyUrl = 'https://localhost:7017/api/AdminPanel/GetCompanyDetail';
  private UpdateCompanyUrl = 'https://localhost:7017/api/AdminPanel/UpdateCompany';


  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error?.message ||
      error.message ||
      'Something went wrong';
    return throwError(() => new Error(msg));
  }
  Save(company: any): Observable<any> {
    return this.http.post(this.apiUrl, company)
      .pipe(catchError(this.handleError));
  }
  GetSerEmployee(): Observable<any> {
    return this.http.get(this.EmpapiUrl)
      .pipe(catchError(this.handleError));
  }
  SaveEmpMaster(employee: any): Observable<any> {
    return this.http.post(this.SaveEmpUrl, employee)
      .pipe(catchError(this.handleError));
  }

  UpdateEmployee(employee: any): Observable<any> {
    return this.http.patch(this.EmpUpdateUrl, employee)
      .pipe(catchError(this.handleError));
  }
  Check(obj: any): Observable<any> {
    return this.http.get(`${this.ChekcCcodeUrl}?obj=${obj}`)
  }
  GetComService(): Observable<any> {
    return this.http.get(this.GetCompanyUrl)
      .pipe(catchError(this.handleError));
  }
  UpdtaeCompany(company: any): Observable<any> {
    return this.http.post(this.UpdateCompanyUrl, company)
      .pipe(catchError(this.handleError));
  }
}