import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { ServicioCliente } from '../../../models/ServicioCliente';
import { UsuarioService } from '../../../services/usuario.service';
import { ServicioclienteService } from '../../../services/serviciocliente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-creaeditaserviciosclientes',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditaserviciosclientes.component.html',
  styleUrl: './creaeditaserviciosclientes.component.css'
})
export class CreaeditaserviciosclientesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listausuarios: Usuario[] = [];
  servicio: ServicioCliente = new ServicioCliente();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private us: UsuarioService,
    private sc: ServicioclienteService,
    private route: ActivatedRoute,
    private router:Router
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
      hfecha: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      husuarios: ['', Validators.required],
    });
    this.us.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.servicio.id = this.form.value.hcodigo;
      this.servicio.nombre = this.form.value.hnombre;
      this.servicio.fechaservicio = this.form.value.hfecha;
      this.servicio.descripcion = this.form.value.hdescripcion;
      this.servicio.u.idUsuario = this.form.value.husuarios;

      if (this.edicion) {
        this.sc.update(this.servicio).subscribe((data) => {
          this.sc.list().subscribe((data) => {
            this.sc.setlist(data);
          });
        });
      } else {
        this.sc.insert(this.servicio).subscribe((data) => {
          this.sc.list().subscribe((data) => {
            this.sc.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['servicios']);
  }
  init() {
    if (this.edicion) {
      this.sc.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hnombre: new FormControl(data.nombre),
          hfecha: new FormControl(data.fechaservicio),
          hdescripcion: new FormControl(data.descripcion),
          husuarios: new FormControl(data.u.idUsuario),
        });
      });
    }
  }
}
