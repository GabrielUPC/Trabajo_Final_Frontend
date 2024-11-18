import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Productos } from '../../../models/Productos';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { ProductoService } from '../../../services/productos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditareviews',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditareviews.component.html',
  styleUrl: './creaeditareviews.component.css'
})
export class CreaeditareviewsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaProductos: Productos[] = [];
  review: Review = new Review();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formbuilder: FormBuilder,
    private rs: ReviewService,
    private pS: ProductoService,
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
      hcalificacion: ['', Validators.required],
<<<<<<< HEAD
      hfecha: ['', Validators.required],
=======
      hfecha: [
        '',
        [
          Validators.required,
          this.maxDateValidator(), // Llamada a la validación personalizada para la fecha máxima
        ],
      ],
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
      hcomentarios: ['', Validators.required],
      hproductos: ['', Validators.required],
    });
    this.pS.list().subscribe((data) => {
      this.listaProductos = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.review.idReview = this.form.value.hcodigo;
      this.review.calificacion = this.form.value.hcalificacion;
      this.review.fecha = this.form.value.hfecha;
      this.review.comentarios = this.form.value.hcomentarios;
      this.review.producto.idProducto = this.form.value.hproductos;

      if (this.edicion) {
        this.rs.update(this.review).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setlist(data);
          });
        });
      } else {
        this.rs.insert(this.review).subscribe((data) => {
          this.rs.list().subscribe((data) => {
            this.rs.setlist(data);
          });
        });
      }
    }
    this.router.navigate(['reviews']);
  }
<<<<<<< HEAD
=======
  maxDateValidator() {
    const today = new Date();
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      if (selectedDate > today) {
        return { futureDate: true };
      }
      return null;
    };
  }
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idReview),
          hcalificacion: new FormControl(data.calificacion),
          hfecha: new FormControl(data.fecha),
          hcomentarios: new FormControl(data.comentarios),
          hproductos: new FormControl(data.producto.idProducto),
        });
      });
    }
  }
}
