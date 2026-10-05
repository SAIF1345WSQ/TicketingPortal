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
  private URL = 'https://localhost:7017/api/TicketRaise/';
  private Ticketurl = 'https://localhost:7017/api/TicketRaise/TicketRaise';
  private GetTicketurl = 'https://localhost:7017/api/TicketRaise/GetTicket';
  private UpdtGetTicketurl = 'https://localhost:7017/api/TicketRaise/UpdateTcket';
  private UpdateTicketByTeam = 'https://localhost:7017/api/TicketRaise/UpdateTcketByTeam';
  private SaveTaskurl = 'https://localhost:7017/api/TicketRaise/SaveTask';
  private SaveTaskstatusurl = 'https://localhost:7017/api/TicketRaise/SaveTaskStatus';
  private LogStatusByAdminurl = 'https://localhost:7017/api/TicketRaise/LogStatusByAdmin';
  private HistoryTaskurl = 'https://localhost:7017/api/TicketRaise/HistoryTask';


  constructor(private http: HttpClient) { }
  SubmitTicket(ticket: any): Observable<any> {
    return this.http.post(this.Ticketurl, ticket);
  }
  GetTicByServices(sessionId: any): Observable<any> {
    return this.http.get(`${this.GetTicketurl}?sessionId=${sessionId}`);
  }
  UpdateTcket(ticket: any): Observable<any> {
    return this.http.put(this.UpdtGetTicketurl, ticket);
  }
  UpdateTcketByTeam(ticket: any): Observable<any> {
    return this.http.post(this.UpdateTicketByTeam, ticket);
  }
  GetHistoryTask(ticket: any): Observable<any> {
    return this.http.get(`${this.HistoryTaskurl}?ticketNo=${ticket}`);
  }
  SaveTaskStatus(taskStatus: any): Observable<any> {
    return this.http.post(this.SaveTaskstatusurl, taskStatus);
  }
  LogStatusByAdmin(taskStatus: any): Observable<any> {
    return this.http.post(this.LogStatusByAdminurl, taskStatus);
  }
  GetRejTaskByAdminService(): Observable<any> {
    return this.http.get(this.URL + 'GetRejTaskByAdmin');
  }
  GetRejTCountList(emid: any, TNo: any): Observable<any> {
    return this.http.get(`${this.URL}GetRejTCountList?empid=${emid}&TNo=${TNo}`);
  }
}


