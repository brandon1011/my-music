import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerUser: RegisterUser = {userName: "", password: "", password2: ""};
    warning: any;
    success: boolean = false;
    loading: boolean = false;
    private regSub: any;

  constructor(private aService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    if (this.regSub)  
        this.regSub.unsubscribe();
  }

  onSubmit(){
      if (this.registerUser.userName != "" && this.registerUser.password == this.registerUser.password2){
        this.loading = true;  
        this.regSub = this.aService.register(this.registerUser).subscribe(() => {
            this.success = true;
            this.warning = null;
            this.loading = false;
        }, (err) => {
            this.success = false;
            this.warning = err.error.message;
            this.loading = false;
        });
      }
  }
}
