import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPanelService } from '../../services/admin-panel.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  Addemployee = {
    id: '',
    employeeCode: '',
    empName: '',
    emailId: '',
    phoneNumber: '',
    address: '',
    isActive: true,
    password: '',
    empType: '',
    designation: '',
    department: '',
    confirmPassword: ''
  };
  ErrorMessage = '';
  Succes = '';
  p: number = 1;
  itemsPerPage: number = 10;
  employees: any[] = [];
  filters: any = {};
  submitted = false;
  showPassword = false;
  showConfirmPassword = true;
  constructor(private AdminService: AdminPanelService) { };

  GetEmploye() {
    this.AdminService.GetSerEmployee().subscribe((res: any) => {
      this.employees = [...res];

    });
  }
  ValidationChekc() {
    const employee = this.Addemployee;
    if (
      !employee.empName?.trim() ||
      !employee.emailId?.trim() ||
      !employee.phoneNumber?.trim() ||
      !employee.password?.trim() ||
      !employee.confirmPassword?.trim() ||
      !employee.empType?.trim() ||
      !employee.designation?.trim() ||
      !employee.department?.trim()
    ) {
      alert("Required Field is Mandotry");
      return;
    }


    if (employee.password !== employee.confirmPassword) {
      return;
    }
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(employee.emailId)) {
      return;
    }
    // Mobile validation
    if (!/^[0-9]{10}$/.test(employee.phoneNumber)) {
      return;
    }
    return true;
  }
  Save() {
    this.submitted = true;
    const Validation = this.ValidationChekc();
    if (Validation) {
      if (this.Addemployee.id == '' || this.Addemployee.id == '' || this.Addemployee == null) {
        this.AdminService.SaveEmpMaster(this.Addemployee).subscribe({
          next: (res) => {
            if (res) {
              this.Succes = res;
              this.GetEmploye();
            }
            else {
              alert(res)
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
            alert(message);
          }
        });
      }
      else {
        this.Addemployee.id = this.Addemployee.id.toString();
        this.AdminService.UpdateEmployee(this.Addemployee).subscribe({
          next: (res) => {
            if (res) {
              this.Succes = res;
              alert("Update Successfully");
              this.GetEmploye();
            }
            else {
              alert(res.message)
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
            alert(message);
          }
        });
      }
    }
  }
  filterItems(items: any[]) {
    return items.filter(item =>
      Object.keys(this.filters).every((key: any) => {
        const filterValue = this.filters[key];
        if (!filterValue) return true;
        return String(item[key] ?? '')
          .toLowerCase()
          .includes(String(filterValue ?? '').toLowerCase());
      })
    );
  }
  enableEdit(emp: any) {
    if (emp.id != null || emp.id != '') {
      var a = this.employees.find(x => x.id == emp.id);
      if (a) {
        this.Addemployee = a;
        this.Addemployee.confirmPassword = a.password;
      }
    }
  }
  CheckDigit(num: any) {
    if (num.length < 10 && num.length < 10) {
      alert("Phone number requires 10 digits");
      return;
    }
  }
  DeleteEmpl(emp: any) {
    if (emp.id != null || emp.id != '') {
      this.AdminService.DeleteEmployee(emp.id).subscribe({
        next: (res) => {
          if (res.success) {
            alert(res.message);
            this.GetEmploye();
          }
          else {
            alert(res.message);
          }
        }, error: (err) => {
          console.log(err);
          const message =
            err.error?.message ||
            err.error ||
            err.message ||
            'Something went wrong';
          this.ErrorMessage = message;
          alert(message);
        }
      });
    }
  }
}
