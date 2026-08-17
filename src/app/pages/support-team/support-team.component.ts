import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/TicketRaise/ticket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-support-team',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './support-team.component.html',
  styleUrl: './support-team.component.css'
})
export class SupportTeamComponent implements OnInit {
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
  sessionId: any = '';
  filters: any = {};
  p: number = 1;
  itemsPerPage: number = 10;
  constructor(private Services: TicketService) { };
  AssignTicket: any[] = [];
  ngOnInit(): void {
    this.sessionId = sessionStorage.getItem('username');
    if (this.sessionId != '') {
      this.Services.GetTicByServices(this.sessionId).subscribe({
        next: (res: any) => {

          this.AssignTicket = res.filter((x: any) => x.assignedTo == this.sessionId);
          const modalElement = document.getElementById('AssignModla');

          if (modalElement) {

          }
        },
        error(error) {
          alert(error.errorMessage);
          console.log(error.errorMessage);
        }
      });
    }
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
  View(item: any) {
    if (item) {
      this.ticket = this.AssignTicket.find(x => x.id == item.id);
    }
  }
  SaveTask() {
    if (this.ticket.id != null || this.ticket.id != '') {
      this.ticket.id = this.ticket.id.toString();
      this.Services.UpdateTcket(this.ticket).subscribe({
        next: (res) => {
          if (res.status) {
            alert("Save Successfully");
            window.location.reload();
          }
          else {
            alert(res.message);
          }
        },error(error) {
          alert(error.errorMessage);
          console.log(error.errorMessage);
        }
      });
    }
  }
}
