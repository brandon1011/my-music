import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = {userName: "", password: "", _id: null};
    warning: any;
    loading: boolean = false;
    private logSub: any;

  constructor(private aService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
      if (this.logSub)
        this.logSub.unsubscribe();
  }

  onSubmit(){
      if (this.user.userName != "" && this.user.password != ""){
          this.loading = true;
          this.logSub = this.aService.login(this.user).subscribe(success => {
              this.loading = false;
              localStorage.setItem("access_token", success.token);
              this.router.navigate(['/newReleases']);
          }, err => {
              this.warning = err.error.message;
              this.loading = false;
          });
      }
  }
}
