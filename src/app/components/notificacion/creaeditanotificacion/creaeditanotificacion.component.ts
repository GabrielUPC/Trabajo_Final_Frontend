import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Notificacion } from '../../../models/Notificacion';
import { UsuarioService } from '../../../services/usuario.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditanotificacion',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditanotificacion.component.html',
  styleUrl: './creaeditanotificacion.component.css'
})
export class CreaeditanotificacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
 
  listausuarios: Usuario[] = [];
  notificacion: Notificacion = new Notificacion();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private us: UsuarioService,
    private ns: NotificacionService,
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
      hfechanotificacion: ['', Validators.required],
      husuarios: ['', Validators.required],
    });
    this.us.list().subscribe((data) => {
      this.listausuarios = data;
    });
    
  }
  insertar(): void {
    if (this.form.valid) {
      this.notificacion.idNotificacion = this.form.value.hcodigo;
      this.notificacion.contenido = this.form.value.hcontenido;
      this.notificacion.fecha = this.form.value.hfechanotificacion;
      this.notificacion.u.idUsuario = this.form.value.husuarios;
      
      if (this.edicion) {
        this.ns.update(this.notificacion).subscribe((data) => {
          this.ns.list().subscribe((data) => {
            this.ns.setlist(data);
          });
        });
      } else {
        this.ns.insert(this.notificacion).subscribe((data) => {
          this.ns.list().subscribe((data) => {
            this.ns.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['notificaciones']);
  }
  init() {
    if (this.edicion) {
      this.ns.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idNotificacion),
          hcontenido: new FormControl(data.contenido),
          hfechanotificacion: new FormControl(data.fecha),
          husuarios: new FormControl(data.u.idUsuario),
        });
      });
    }
  }
}
