import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate{

  constructor(private aService: AuthService, private router: Router) { }

  canActivate(): boolean{
      if (!this.aService.isAuthenticated()){
          this.router.navigate(['/login']);
          return false;
      }
      else{
          return true;
      }
  }
}
