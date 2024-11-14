import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Productos } from '../../../models/Productos';
import { MetodoPago } from '../../../models/MetodoPago';
import { ProductoService } from '../../../services/productos.service';
import { MetodopagoService } from '../../../services/metodopago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditametodopago',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditametodopago.component.html',
  styleUrl: './creaeditametodopago.component.css'
})
export class CreaeditametodopagoComponent {
  form: FormGroup = new FormGroup({});
  listaproductos: Productos[] = [];
  metodop: MetodoPago = new MetodoPago();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private ps: ProductoService,
    private ms: MetodopagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formbuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      htipo: ['', Validators.required],
      hproductos: ['', Validators.required],
    });
    this.ps.list().subscribe((data) => {
      this.listaproductos = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.metodop.id = this.form.value.hcodigo;
      this.metodop.nombre = this.form.value.hnombre;
      this.metodop.tipo = this.form.value.htipo;
      this.metodop.p.idProducto = this.form.value.hproductos;
      
      if (this.edicion) {
        this.ms.update(this.metodop).subscribe((data) => {
          this.ms.list().subscribe((data) => {
            this.ms.setlist(data);
          });
        });
      } else {
        this.ms.insert(this.metodop).subscribe((data) => {
          this.ms.list().subscribe((data) => {
            this.ms.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['metodopagos']);
  }
  init() {
    if (this.edicion) {
      this.ms.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hnombre: new FormControl(data.nombre),
          htipo: new FormControl(data.tipo),
          hproductos: new FormControl(data.p.idProducto),
        });
      });
    }
  }
}
