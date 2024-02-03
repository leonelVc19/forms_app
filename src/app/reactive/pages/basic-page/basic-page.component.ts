import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

const product = {
  name: 'e',
  price: 0,
  inStorage: 0,
};
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {


  //!! Hay dos opciones solo que una ofrese una sitaxis mucho mas limpia
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  //*formBuilder

  constructor(
    private fB: FormBuilder,
    private validatorService: ValidatorsService
  ) { }

  ngOnInit(): void {
    // this.myForm.reset(product)

  };

  //simplicar las validaciones
  public isValid(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field)

  };

  public getFieldError(field: string): string | null{
    if ( !this.myForm.controls[field]  ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requierido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    };

    return null;
  };

  public myForm: FormGroup = this.fB.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]]
  });

  public onSave(): void {
    if( this.myForm.invalid ) {
      //Activa todas las validaciones
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value );
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
