import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminPanelService } from '../../services/admin-panel.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-pannel',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './admin-pannel.component.html',
  styleUrl: './admin-pannel.component.css'
})
export class AdminPannelComponent implements OnInit {

  constructor(private AdminService: AdminPanelService) {
  }

  customer = {
    id: '',
    customerCode: '',
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    emailId: '',
    sapVersion: '',
    databaseType: 'SQL',
    supportContractStatus: 'Active',
    gstNumber: '',
    panNumber: '',
    projectManager: '',
    supportTeam: '',
    dbCredentials: '',
    rdpDetails: '',
    ultraViewerDetails: '',
    status: 'ACTIVE',
    sapnoOfUsers: '',
    sapNoOfProfessionalUsers: '',
    sapNoOfLimitedUsers: '',
    sapLoginId: '',
    sapLoginPassword: '',
    cusLoginPassword: '',
    Rowengineers: [] as any[]
  };
  Temp: any = {};
  engineer = {
    employeeCode: '',
    name: '',
    emailId: '',
    phoneNumber: ''
  };
  sapUserInfo = {
    status: 'ACTIVE',
    noOfUsers: 0,
    noOfProfessionalUsers: 0,
    noOfLimitedUsers: 0,
    sapLoginId: '',
    sapLoginPassword: ''
  };
  Addemployee = {
    employeeCode: '',
    empName: '',
    emailId: '',
    phoneNumber: '',

    isActive: true,
    password: ''
  };
  filters: any = {};

  showCustomerModal = false;
  engineers: any[] = [];
  employees: any[] = [];
  Modalcustomers: any[] = [];
  Modalengineers: any[] = [];
  showModal = false;
  ErrorMessage = '';
  Succes = '';
  ComErrorMessage = '';
  ComSuccessMsg = ''
  p: number = 1;
  itemsPerPage: number = 10;
  ngOnInit(): void {
    this.GetEmploye();

  }
  GetCompanyDet() {
    this.AdminService.GetComService().subscribe({
      next: (res: any) => {
        // Customer bind
        this.Modalcustomers = res.customer;
        this.Modalengineers = res.rowSupport;
      },
      error: (err) => console.log(err)
    });
  }
  CheckCCode() {
    this.AdminService.Check(this.customer.customerCode).subscribe({
      next: (res) => {
        if (res.success) {
          this.Succes = res;
        }
        else {
          alert(res.message);
          this.customer.customerCode = '';
        }
      },
      error: (err) => {
        console.log(err);
        const message =
          err.error?.message ||
          err.error ||
          err.message ||
          'Something went wrong';
        alert(err.error.message);
        this.customer.customerCode = '';
        this.ErrorMessage = message;
      }
    });
  }

  GetEmploye() {
    this.AdminService.GetSerEmployee().subscribe((res: any) => {
      this.employees = [...res];
    });
  }
  ValidationCheck() {
    const c = this.customer;

    if (!c.customerCode?.trim()) {
      alert("Customer Code is required");
      return;
    }

    if (!c.companyName?.trim()) {
      alert("Company Name is required");
      return;
    }

    if (!c.contactPerson?.trim()) {
      alert("Contact Person is required");
      return;
    }

    if (!c.mobileNumber?.trim()) {
      alert("Mobile Number is required");
      return;
    }
    if (!/^[0-9]{10}$/.test(c.mobileNumber)) {
      alert("Mobile Number must be 10 digits");
      return;
    }
    if (!c.emailId?.trim()) {
      alert("Email ID is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.emailId)) {
      alert("Please enter a valid Email ID");
      return;
    }

    if (!c.sapVersion?.trim()) {
      alert("SAP Version is required");
      return;
    }

    if (!c.gstNumber?.trim()) {
      alert("GST Number is required");
      return;
    }

    if (!c.panNumber?.trim()) {
      alert("PAN Number is required");
      return;
    }

    if (!c.projectManager?.trim()) {
      alert("Project Manager is required");
      return;
    }

    if (!c.supportTeam?.trim()) {
      alert("Support Team is required");
      return;
    }

    return {
      valid: true,
      message: 'Validation successful'
    };
  }
  saveEmployee() {
    if (this.Addemployee.empName == null || this.Addemployee.empName == '') {
      this.ErrorMessage = "empname is mandotry";
      return;
    }
    if (this.Addemployee.emailId == null || this.Addemployee.emailId == '') {
      this.ErrorMessage = "emial is Mandotry";
      return;
    }
    if (this.Addemployee.phoneNumber == null || this.Addemployee.phoneNumber == '') {
      this.ErrorMessage = "Phone Number is Mandotry";
      return;
    }
    this.AdminService.SaveEmpMaster(this.Addemployee).subscribe({
      next: (res) => {
        if (res) {
          this.Succes = res;
          this.GetEmploye();
        }
      },
      error: (err) => {
        console.log(err);
        const message =
          err.error?.message ||
          err.error ||
          err.message ||
          'Something went wrong';
        this.ErrorMessage = message;
      }
    });
  }
  SelectEmp(empCode: string) {
    console.log(empCode);

    // Selected employee details
    const emp = this.employees.find((x: any) => x.employeeCode === empCode);

    if (emp) {
      this.engineer.name = emp.empName;
      this.engineer.emailId = emp.emailId;
      this.engineer.phoneNumber = emp.phoneNumber;
    }
  }
  addEngineer() {
    if (
      !this.engineer.employeeCode ||
      !this.engineer.name ||
      !this.engineer.emailId ||
      !this.engineer.phoneNumber
    ) {
      alert('Please fill all fields.');
      return;
    }
    this.engineers.push({ ...this.engineer });

    this.engineer = {
      employeeCode: '',
      name: '',
      emailId: '',
      phoneNumber: ''
    };
  }
  deleteEngineer(index: number) {
    this.engineers.splice(index, 1);
  }
  Save() {
    if (this.customer == null) {
      this.ErrorMessage = "Please Fill All Company details";
    }
    else if (this.engineers == null) {
      this.ErrorMessage = "Please Fill All Enginners details";
    }
    const validationError = this.ValidationCheck();
    if (!validationError) {
      return;
    }
    this.customer.Rowengineers = [...this.engineers];
    if (this.customer.id == '' || this.customer.id == null || this.customer.id == undefined) {
      this.AdminService.Save(this.customer).subscribe({
        next: (res) => {
          if (res) {
            if (res.success) {
              this.ComSuccessMsg = res.message;
              window.location.reload();
            }
            else {
              this.ComErrorMessage = res.message;
            }
          }
        },
        error: (err) => {
          console.log(err);
          const message =
            err.error?.message ||
            err.error ||
            err.message ||
            'Something went wrong';
          this.ErrorMessage = message;
          alert(err.message);
        }
      });
    }
    else {
      this.AdminService.UpdtaeCompany(this.customer).subscribe({
        next: (res) => {
          if (res) {
            if (res.success) {
              alert(res.message);
              this.ComSuccessMsg = res.message;
              window.location.reload();
            }
            else {
              alert(res.message);
            }
          }
        },
        error: (err) => {
          console.log(err);
          const message =
            err.error?.message ||
            err.error ||
            err.message ||
            'Something went wrong';
          this.ErrorMessage = message;
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
  enableEdit(data: any) {
    if (data) {
      const filterComp = this.Modalcustomers.find(x => x.customerCode == data.customerCode);
      if (filterComp) {
        this.customer = filterComp;
      }
      const filter = this.Modalengineers.filter(x => x.customerCode == data.customerCode);
      if (filter) {
        this.engineers = filter;
      }
    }
  }

  UserTotVerify() {

    var total =
      (Number(this.customer.sapNoOfProfessionalUsers) || 0) +
      (Number(this.customer.sapNoOfLimitedUsers) || 0);

    if (total > Number(this.customer.sapnoOfUsers)) {
      alert("Professional Users cannot be greater than Total Users");
      this.customer.sapNoOfProfessionalUsers = '';
      this.customer.sapNoOfLimitedUsers = '';
    }
  }

  DeleteSaveCompany(data: any) {

  }
  Reset() {
    window.location.reload();
  }
}
