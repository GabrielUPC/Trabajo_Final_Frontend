import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/Usuario';
import { Roles } from '../../../models/Roles';
import { UsuarioService } from '../../../services/usuario.service';
import { RolesService } from '../../../services/roles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css'
})
export class CreaeditarolesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listausuarios: Usuario[] = [];
  roles: Roles = new Roles();
  edicion: boolean = false;
  id: number = 0;
  listaRoles: { value: String; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'VENDEDOR', viewValue: 'VENDEDOR' },
    { value: 'COMPRADOR', viewValue: 'COMPRADOR' },
  ];
  constructor(
    private formbuilder: FormBuilder,
    private us: UsuarioService,
    private sc: RolesService,
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
      husuarios: ['', Validators.required],
    });
    this.us.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.roles.id = this.form.value.hcodigo;
      this.roles.rolname = this.form.value.hnombre;
      this.roles.user.idUsuario = this.form.value.husuarios;

      if (this.edicion) {
        this.sc.update(this.roles).subscribe((data) => {
          this.sc.list().subscribe((data) => {
            this.sc.setlist(data);
          });
        });
      } else {
        this.sc.insert(this.roles).subscribe((data) => {
          this.sc.list().subscribe((data) => {
            this.sc.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['roles']);
  }
  init() {
    if (this.edicion) {
      this.sc.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hnombre: new FormControl(data.rolname),
          husuarios: new FormControl(data.user.idUsuario),
        });
      });
    }
  }
}
