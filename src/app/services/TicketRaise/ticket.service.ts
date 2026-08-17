import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error?.message ||
      error.message ||
      'Something went wrong';
    return throwError(() => new Error(msg));
  }
  private Ticketurl = 'https://localhost:7017/api/TicketRaise/TicketRaise';
  private GetTicketurl = 'https://localhost:7017/api/TicketRaise/GetTicket';
  private UpdtGetTicketurl = 'https://localhost:7017/api/TicketRaise/UpdateTcket';
  private SaveTaskurl = 'https://localhost:7017/api/TicketRaise/SaveTask';

  constructor(private http: HttpClient) { }
  SubmitTicket(ticket: any): Observable<any> {
    return this.http.post(this.Ticketurl, ticket).pipe(catchError(this.handleError));
  }
  GetTicByServices(sessionId: any): Observable<any> {
    return this.http.get(`${this.GetTicketurl}?sessionId=${sessionId}`).pipe(catchError(this.handleError));
  }
  UpdateTcket(ticket: any): Observable<any> {
    return this.http.put(this.UpdtGetTicketurl, ticket).pipe(catchError(this.handleError));
  }
}


