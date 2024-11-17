import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-creaeditausuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditausuarios.component.html',
  styleUrls: ['./creaeditausuarios.component.css'],
})
export class CreaeditausuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0; //usar para editar
  edicion: boolean = false; //usar para editar
  constructor(
    private formbuilder: FormBuilder,
    private us: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    }); //usar para editar
    this.form = this.formbuilder.group({
      hcodigo: [''],
      hdni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      hnombre: ['', Validators.required],
      hdireccion: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]],
      htelefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      husername: ['', Validators.required],
      hpassword: ['', Validators.required],
      henabled: [this.usuario.enabled], // Inicializado con el valor del modelo
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.dni = this.form.value.hdni;
      this.usuario.nombre = this.form.value.hnombre;
      this.usuario.correo = this.form.value.hcorreo;
      this.usuario.direccion = this.form.value.hdireccion;
      this.usuario.telefono = this.form.value.htelefono;
      this.usuario.username = this.form.value.husername;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.enabled = this.form.value.henabled;
      if (this.edicion) {
        this.us.update(this.usuario).subscribe(() => {
          this.us.list().subscribe((data) => {
            this.us.setList(data);
          });
        }); //usar para editar
      } else {
        this.us.insert(this.usuario).subscribe(() => {
          this.us.list().subscribe((data) => {
            this.us.setList(data);
          });
        }); //usar para insertar
      }
    }
    this.router.navigate(['usuarios']);
  }
  toggleEnabled(): void {
    const currentValue = this.form.get('henabled')?.value;
    this.form.get('henabled')?.setValue(!currentValue);
  }
  init() {
    if (this.edicion) {
      this.us.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUsuario),
          hdni: new FormControl(data.dni, [
            Validators.required,
            Validators.pattern('^[0-9]{8}$'),
          ]),
          hnombre: new FormControl(data.nombre),
          hcorreo: new FormControl(data.correo, [
            Validators.required,
            Validators.email,
          ]),
          hdireccion: new FormControl(data.direccion),
          htelefono: new FormControl(data.telefono, [
            Validators.required,
            Validators.pattern('^[0-9]{9}$'),
          ]),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
          henabled: new FormControl(data.enabled),
        });
      });
    }
  }
}
