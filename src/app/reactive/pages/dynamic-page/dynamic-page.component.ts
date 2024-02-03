import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {


  //*similar
  // public myFormArray = new FormGroup({
  //   favoriteGames:  new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required,  Validators.minLength(3) ]],
    //*similar
    favoriteGames: this.fb.array([
      ['Halo', Validators.required],
      ['Geometry Dash', Validators.required],
      ['Metal Slug', Validators.required]
    ]),

  });

  //form to add favorites games
  public newFavorite: FormControl = new FormControl( '', [Validators.required] );

  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsService
  ) {};

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  };

   //simplicar las validaciones
  public isValid(field: string): boolean | null {
    return this.validatorServices.isValidField(this.myForm, field)
  };
  public isValidFieldArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

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

  //eliminado favorito
  public onDeleteFavorie( index: number ): void {
    this.favoriteGames.removeAt(index)
  };

  public addToFavorite(): void {
    if( this.newFavorite.invalid ) return;
    console.log(this.newFavorite.value);
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required ) )

    //formbuilder
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavorite.reset();
  }

  public onSumit():void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    ( this.myForm.controls['favoriteGames']as FormArray )  = this.fb.array([]);
    this.myForm.reset();
  };


}
