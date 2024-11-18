import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';

import { Oferta } from '../../../models/Oferta';
import { Productos } from '../../../models/Productos';
import { UsuarioService } from '../../../services/usuario.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { ProductoService } from '../../../services/productos.service';

@Component({
  selector: 'app-creaeditaproductos',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],

  templateUrl: './creaeditaproductos.component.html',
  styleUrl: './creaeditaproductos.component.css'
})
export class CreaeditaproductosComponent {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[] = [];

  listaOfertas: Oferta[] = [];
  producto: Productos = new Productos();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private us: UsuarioService,

    private os: OfertaService,
    private Ps: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id']!=null;
      this.init()
    });
    this.form = this.formbuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hprecio: ['', Validators.required],
      hestado: ['',Validators.required],
      hfechavencimiento: ['', Validators.required],
      hstock: ['', Validators.required],
      hoferta: ['', Validators.required]
    });

    this.os.list().subscribe((data) => {
      this.listaOfertas = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.producto.idProducto = this.form.value.hcodigo;
      this.producto.nombreProducto = this.form.value.hnombre;
      this.producto.descripcionProducto = this.form.value.hdescripcion;
      this.producto.precioProducto = this.form.value.hprecio;
      this.producto.estadoProducto = this.form.value.hestado;
      this.producto.fechavencimiento = this.form.value.hfechavencimiento;
      this.producto.stockProducto = this.form.value.hstock;
      this.producto.o.idOferta = this.form.value.hoferta;

      if (this.edicion) {
        this.Ps.listId(this.id).subscribe((data) => {
          this.producto.u = data.u; // Recupera el usuario existente
          this.Ps.update(this.producto).subscribe(() => {
            this.Ps.list().subscribe((data) => {
              this.Ps.setlist(data);
            });
          });
        });
      } else {
        this.Ps.insert(this.producto).subscribe((data) => {
          this.Ps.list().subscribe((data) => {
            this.Ps.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['productos']);
  }
  init() {
    if (this.edicion) {
      this.Ps.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idProducto),
          hnombre: new FormControl(data.nombreProducto),
          hdescripcion: new FormControl(data.descripcionProducto),
          hprecio: new FormControl(data.precioProducto),
          hestado: new FormControl(data.estadoProducto),
          hfechavencimiento: new FormControl(data.fechavencimiento),
          hstock: new FormControl(data.stockProducto),
          hoferta: new FormControl(data.o.idOferta),
        });
      });
    }
  }
}
