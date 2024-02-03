import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsService,
  ) {};


  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M',  Validators.required,],
    wantNotifications: [ true ],
    termsAndCoditions: [ false,  Validators.requiredTrue, ]
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  onSubmit() {
    if ( this.myForm.valid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndCoditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.valid);
    console.log(this.person);

  };

  public isValid(field: string): boolean | null {
    return this.validatorServices.isValidField(this.myForm, field)
  };
}
