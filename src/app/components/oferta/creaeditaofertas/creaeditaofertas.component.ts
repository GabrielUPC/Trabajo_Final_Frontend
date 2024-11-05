import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Oferta } from '../../../models/Oferta';
import { OfertaService } from '../../../services/oferta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-creaeditaofertas',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatDatepickerModule,CommonModule,MatInputModule,MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditaofertas.component.html',
  styleUrl: './creaeditaofertas.component.css',
})
export class CreaeditaofertasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  oferta: Oferta = new Oferta();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private os: OfertaService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    });
    this.form = this.formbuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hfechaInicio: ['', Validators.required],
      hfechaFin: ['', Validators.required],
      hcantidad: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.oferta.idOferta = this.form.value.hcodigo
      this.oferta.nombreOferta = this.form.value.hnombre
      this.oferta.fechaInicio = this.form.value.hfechaInicio
      this.oferta.fechaFin = this.form.value.hfechaFin
      this.oferta.cantidadProductos = this.form.value.hcantidad;

      if (this.edicion) {
        this.os.update(this.oferta).subscribe((data) => {
          this.os.list().subscribe((data) => {
            this.os.setlist(data);
          });
        });
      } else {
        this.os.insert(this.oferta).subscribe((data) => {
          this.os.list().subscribe((data) => {
            this.os.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['ofertas']);
  }
  init(){
    if(this.edicion){
      this.os.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.idOferta),
          hnombre:new FormControl(data.nombreOferta),
          hfechaInicio:new FormControl(data.fechaInicio),
          hfechaFin:new FormControl(data.fechaFin),
          hcantidad:new FormControl(data.cantidadProductos)
        })
      })
    }
  }
}
