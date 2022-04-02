import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { AuthService } from 'libs/web/login/data-access/src/lib/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  message: string;
  loginDto: LoginUserDto = new LoginUserDto();
  error: string

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.loginDto).subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/dashboard`.
        const redirectUrl = '/dashboard';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      } else {
        if(this.authService.error) {
          this.error = JSON.stringify(this.authService.error)
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
