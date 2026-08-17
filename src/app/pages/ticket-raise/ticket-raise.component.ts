import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../../services/TicketRaise/ticket.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPanelService } from '../../services/admin-panel.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-ticket-raise',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, DropdownModule],
  templateUrl: './ticket-raise.component.html',
  styleUrl: './ticket-raise.component.css'
})
export class TicketRaiseComponent implements OnInit {
  sessionId: any = '';
  isEmployee = false;
  constructor(private http: HttpClient, private services: TicketService, private adminservice: AdminPanelService) { }
  ticket = {
    // Header
    ticketNo: '',
    id: '',
    ticketStatus: 'Open',
    dateTime: '',
    customerCode: '',
    // Issue Details
    category: '',
    module: '',
    priority: 'Medium',
    subject: '',
    description: '',
    errorMessage: '',
    stepsToReproduce: '',

    // Contact
    contactName: '',
    contactEmail: '',
    contactNo: '',
    contactSubDate: '',

    // Client Status
    clientStatus: '',
    clientStatusDateTime: '',
    closureDateTime: '',
    clientRemarks: '',

    // Internal Tracking
    acknowledgeBy: '',
    acknowledgeDateTime: '',

    assignedTo: '',

    assignedDate: '',

    closureDateTimeToClient: '',

    closedByTeamOn: '',
    closureDateTimeTeam: '',
    actualCompletionDateTime: '',
    timeTakenVsAllocated: '',
    contactNoAdmin: '',
    emailId: '',
    closureDateTimeAdmin: '',
    taskStatus: '',
    startDate: '',
    completeDate: '',
    timeTaken: ''
  };
  filters: any = {};
  modalCompany: any[] = [];
  employees: any[] = [];
  AssignedTask: any[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  ngOnInit() {
    this.sessionId = sessionStorage.getItem('username');
    if (this.sessionId != null) {
      this.ticket.customerCode = this.sessionId;
      if (this.sessionId.includes("EMP")) {
        this.isEmployee = true;
        this.adminservice.GetSerEmployee().subscribe((res: any) => {
          this.employees = [...res];
        });
      }
    }
  }
  resetForm() {
    this.ticket = {
      ticketNo: '',
      customerCode: '',
      ticketStatus: 'Open',
      dateTime: '',
      id: '',
      category: '',
      module: '',
      priority: 'Medium',
      subject: '',
      description: '',
      errorMessage: '',
      stepsToReproduce: '',

      contactName: '',
      contactEmail: '',
      contactNo: '',
      contactSubDate: '',

      clientStatus: '',
      clientStatusDateTime: '',
      closureDateTime: '',
      clientRemarks: '',

      acknowledgeBy: '',
      acknowledgeDateTime: '',
      assignedTo: '',
      assignedDate: '',
      closureDateTimeToClient: '',

      closedByTeamOn: '',
      closureDateTimeTeam: '',
      actualCompletionDateTime: '',

      timeTakenVsAllocated: '',

      contactNoAdmin: '',
      emailId: '',
      closureDateTimeAdmin: '',
      taskStatus: '',
      startDate: '',
      completeDate: '',
      timeTaken: ''
    };
  }
  submitTicket() {
    console.log('Ticket Data', this.ticket);
    if (this.ticket.id == '' || this.ticket.id == undefined || this.ticket.id == null) {
      this.services.SubmitTicket(this.ticket).subscribe({
        next: (res) => {
          if (res.status) {
            alert("Save Successfully");
            this.resetForm();
          }
          else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
          const message =
            err.error?.message ||
            err.error ||
            err.message ||
            'Something went wrong';
          alert(err.message)
        }
      })
    } else {
      this.ticket.id = String(this.ticket.id);
      this.services.UpdateTcket(this.ticket).subscribe({
        next: (res) => {
          if (res.status) {
            alert("Update Successfully");
            this.resetForm();
          }
          else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
          const message =
            err.error?.message ||
            err.error ||
            err.message ||
            'Something went wrong';
          alert(err.message)
        }
      })
    }
    // API Call Here
    // this.ticketService.saveTicket(this.ticket).subscribe(...);
  }
  GerTicket() {
    this.services.GetTicByServices(this.sessionId).subscribe({
      next: (res) => {
        if (res) {
          this.modalCompany = res;
        }
        else {

        }
      }
    })
  }

  calculateTimeTaken() {

    if (
      this.ticket.dateTime &&
      this.ticket.actualCompletionDateTime
    ) {

      const start = new Date(this.ticket.dateTime);
      const end = new Date(this.ticket.actualCompletionDateTime);

      const diffMs = end.getTime() - start.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (diffMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      this.ticket.timeTakenVsAllocated =
        `${hours} Hours ${minutes} Minutes`;
    }
  }
  saveTicket(ticket: any) {
    var a = 5;
  }
  filterItems(items: any[]) {
    return items.filter(item =>
      Object.keys(this.filters).every((key: any) => {
        const filterValue = this.filters[key];
        if (!filterValue) return true;
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toString().toLowerCase());
      })
    );
  }
  enableEdit(data: any) {
    if (data) {
      const filterComp = this.modalCompany.find(x => x.id == data.id);
      if (filterComp) {
        this.ticket = filterComp;
      }
    }
  }
  DeleteSaveCompany(data: any) {
  }
  GetTaskstatus(empid: string, TNo: string) {

    const a = this.modalCompany.filter(x => x.ticketNo == TNo && x.assignedTo == empid).map(x => ({ ...x }));//Map is for no Original data change 
    a.forEach((item: any) => {

      if (item.startDate) {
        item.startDate = this.dateformat(item.startDate)
      }
      if (item.completeDate) {
        item.completeDate = this.dateformat(item.completeDate);
      }
    });
    this.AssignedTask = a;

  }
  dateformat(dateformat: any) {
    const date = new Date(dateformat);
    const a =
      String(date.getDate()).padStart(2, '0') + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      date.getFullYear();
    return a;
  }
}
