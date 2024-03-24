import { ValidatorFn } from "@angular/forms";

export function emailValidator(domain:string[]): ValidatorFn {
    
    const regExp = new RegExp('^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9]+.[a-z]+$');
    return (control) => {
        
      const isEmailInvalid = control.value === '' || regExp.test(control.value);
      return isEmailInvalid ? null : { emailValidator: true };
    }
  }