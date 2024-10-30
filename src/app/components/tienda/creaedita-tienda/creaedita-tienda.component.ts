import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-creaedita-tienda',
  standalone: true,
  
  
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './creaedita-tienda.component.html',
  styleUrl: './creaedita-tienda.component.css'
})
export class CreaeditaTiendaComponent {
  nombreFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  descripcionFormControl = new FormControl('', [Validators.required, Validators.minLength(20)]);
  direccionFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);

  matcher = new MyErrorStateMatcher();
}


