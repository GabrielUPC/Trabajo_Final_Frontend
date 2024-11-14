import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarritoxProducto } from '../../../models/CarritoxProducto';
import { Pedido } from '../../../models/Pedido';
import { CarritoxproductoService } from '../../../services/carritoxproducto.service';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditapedidos',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditapedidos.component.html',
  styleUrl: './creaeditapedidos.component.css'
})
export class CreaeditapedidosComponent {
  form: FormGroup = new FormGroup({});
  listacarritop: CarritoxProducto[] = [];
  pedido: Pedido = new Pedido();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private cps: CarritoxproductoService,
    private Ps: PedidoService,
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
      hfechapedido: ['', Validators.required],
      hfechaentrega: ['', Validators.required],
      hestado: ['', Validators.required],
      hcarritoproducto: ['',Validators.required],
    });
    this.cps.list().subscribe((data) => {
      this.listacarritop = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.pedido.idPedido = this.form.value.hcodigo;
      this.pedido.fechacPedido = this.form.value.hfechapedido;
      this.pedido.fechaEntrega = this.form.value.hfechaentrega;
      this.pedido.estado = this.form.value.hestado;
      this.pedido.carritoxProducto.idCarritoXProducto = this.form.value.hcarritoproducto;
      
      if (this.edicion) {
        this.Ps.update(this.pedido).subscribe((data) => {
          this.Ps.list().subscribe((data) => {
            this.Ps.setlist(data);
          });
        });
      } else {
        this.Ps.insert(this.pedido).subscribe((data) => {
          this.Ps.list().subscribe((data) => {
            this.Ps.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['pedidos']);
  }
  init() {
    if (this.edicion) {
      this.Ps.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idPedido),
          hfechapedido: new FormControl(data.fechacPedido),
          hfechaentrega: new FormControl(data.fechaEntrega),
          hestado: new FormControl(data.estado),
          hcarritoproducto: new FormControl(data.carritoxProducto.idCarritoXProducto),
        });
      });
    }
  }
}
