import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Inyeccion de dependencias
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validators.service';

//forma utilizando solo validaciones
// import * as customeValidators from 'src/app/shared/validators/validators.functions';]

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsService,
    private emalServices: EmailValidatorService,
  ) {

  }
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,  Validators.pattern(this. validatorServices.firstNameAndLastnamePattern)]],
    // email: ['',  [Validators.required, Validators.pattern(this. validatorServices.emailPattern )],[ new EmailValidatorService ]],
    email: ['',  [Validators.required, Validators.pattern(this. validatorServices.emailPattern )],[ this.emalServices ]],
    username: ['', [Validators.required, this.validatorServices.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    //validadores asinccronos y sincronos
    validators: [
      this.validatorServices.isFeildOneEqualFieldTwo('password', 'password2'),
    ]
  });

  isValidField( field: string ) {
    //TODO validacion de un servicion
    return this.validatorServices.isValidField(this.myForm, field)
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
