import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";
import { inject } from "@angular/core";


export const seguridadGuard = (route:ActivatedRoute, state:RouterStateSnapshot) => {
  const lService=inject(LoginService)
  const router=inject(Router)
  const rpta=lService.verificar();
  if(!rpta){
    router.navigate(['/login']);
    return false;
  }
  return rpta;
};
