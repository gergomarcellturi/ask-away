import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function emailFormatValidator(control: AbstractControl): { [key: string]: any } | null {
  return new RegExp('^([a-z0-9_-]+.?)*[a-z0-9-+]+@[a-z0-9.-]+\\.[a-z]{2,4}$').test(control.value) ?
    null : {invalidEmailFormat: true};
}

export const passwordMatchingValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pass1 = control.get('password');
  const pass2 = control.get('passwordRe');

  return pass1 && pass2 && pass1.value === pass2.value ? null : {passwordMismatch: true};
};
