import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Pedido } from '../../../models/Pedido';
import { Reclamo } from '../../../models/Reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-creaeditareclamos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditareclamos.component.html',
  styleUrl: './creaeditareclamos.component.css',
})
export class CreaeditareclamosComponent {
  form: FormGroup = new FormGroup({});
  listaPedidos: Pedido[] = [];
  reclamo: Reclamo = new Reclamo();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private rs: ReclamoService,
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
      hcontenido: ['', Validators.required],
      hfechaReclamo: ['', Validators.required],
      hpedido: ['', Validators.required],
    });
    this.Ps.list().subscribe((data) => {
      this.listaPedidos = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.reclamo.idReclamos = this.form.value.hcodigo;
      this.reclamo.contenidoReclamo = this.form.value.hcontenido;
      this.reclamo.fechaReclamo = this.form.value.hfechaReclamo;
      this.reclamo.p.idPedido = this.form.value.hpedido;

      if (this.edicion) {
        this.rs.update(this.reclamo).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setlist(data);
          });
        });
      } else {
        this.rs.insert(this.reclamo).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['reclamos']);
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idReclamos),
          hcontenido: new FormControl(data.contenidoReclamo),
          hfechaReclamo: new FormControl(data.fechaReclamo),
          hpedido: new FormControl(data.p.idPedido),
        });
      });
    }
  }
}
