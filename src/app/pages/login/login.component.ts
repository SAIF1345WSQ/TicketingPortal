import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  constructor(private router: Router, private service: LoginService) { }

  loginModel = {
    username: '',
    password: ''
  };

  Login() {
    if (!this.loginModel.username || !this.loginModel.password) {
      alert("Please Enter a UserName and Passsword");
      return;
    }
    this.service.Login(this.loginModel).subscribe({
      next: (res) => {
        if (res.success) {
          // loginModel se UserId Session Storage mein save
          sessionStorage.setItem(
            'username',
            this.loginModel.username
          );
          this.router.navigate(['/index']);
        }
        else {
          alert("Pleas Enter a valid Credential");
        }
      }, error: (err) => {
        console.log(err);
        const message =
          err.error?.message ||
          err.error ||
          err.message ||
          'Something went wrong';
      }
    });

  }

}
