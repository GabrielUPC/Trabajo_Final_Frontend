import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Productos } from '../../../models/Productos';
import { CarritoxProducto } from '../../../models/CarritoxProducto';
import { ProductoService } from '../../../services/productos.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarritoxproductoService } from '../../../services/carritoxproducto.service';
import { Carrito } from '../../../models/Carrito';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-creaditacarritoxproducto',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaditacarritoxproducto.component.html',
  styleUrl: './creaditacarritoxproducto.component.css'
})
export class CreaditacarritoxproductoComponent {
  form: FormGroup = new FormGroup({});

  listaproductos: Productos[] = [];
  listacarritos: Carrito[] = [];
  carritoProducto: CarritoxProducto = new CarritoxProducto();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private ps: ProductoService,
    private cps: CarritoxproductoService,
    private cs:CarritoService,
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
      hcantidad: ['', Validators.required],
      hproductos: ['', Validators.required],
      hcarritos:['', Validators.required],
    });
    this.ps.list().subscribe((data) => {
      this.listaproductos = data;
    });
    this.cs.list().subscribe((data) => {
      this.listacarritos = data;
    });
   
  }
  insertar(): void {
    if (this.form.valid) {
      this.carritoProducto.idCarritoXProducto = this.form.value.hcodigo;
      this.carritoProducto.cantidadCarrito = this.form.value.hcantidad;
      this.carritoProducto.producto.idProducto = this.form.value.hproductos;
      this.carritoProducto.carrito.id = this.form.value.hcarritos;
      
      if (this.edicion) {
        this.cps.update(this.carritoProducto).subscribe((data) => {
          this.cps.list().subscribe((data) => {
            this.cps.setlist(data);
          });
        });
      } else {
        this.cps.insert(this.carritoProducto).subscribe((data) => {
          this.cps.list().subscribe((data) => {
            this.cps.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['CarritoProductos']);
  }
  init() {
    if (this.edicion) {
      this.cps.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCarritoXProducto),
          hcantidad: new FormControl(data.cantidadCarrito),
          hproductos: new FormControl(data.producto.idProducto),
          hcarritos: new FormControl(data.carrito.id),
        });
      });
    }
  }
}
