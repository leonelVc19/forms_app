import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  constructor( private fb: FormBuilder ) {

  }
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['',  [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(6)]],
    password2: ['', [Validators.required]],
  });

  isValidField( fiel: string ) {
    //TODO validacion de un servicion
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
