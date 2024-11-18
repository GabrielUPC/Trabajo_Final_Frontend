import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Carrito } from '../../../models/Carrito';
import { CarritoService } from '../../../services/carrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
<<<<<<< HEAD
=======
import { LoginService } from '../../../services/login.service';
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
@Component({
  selector: 'app-creaeditacarritos',
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule,MatButtonModule,MatInputModule,CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditacarritos.component.html',
  styleUrl: './creaeditacarritos.component.css'
})
export class CreaeditacarritosComponent implements OnInit{
  formCarrito:FormGroup=new FormGroup({})      
  carrito:Carrito=new Carrito()     
  id:number=0     
  edicion:boolean=false     
  constructor(
    private cs:CarritoService,
    private formbuilder:FormBuilder,
    private router:Router,
<<<<<<< HEAD
    private route:ActivatedRoute
=======
    private route:ActivatedRoute,
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data : Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
    })
    this.formCarrito=this.formbuilder.group({
      hcodigo:[''],
<<<<<<< HEAD
      hestado:['',Validators.required]
=======
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
    })
  }
  insertar():void{
    if(this.formCarrito.valid){
      this.carrito.id=this.formCarrito.value.hcodigo
<<<<<<< HEAD
      this.carrito.estado=this.formCarrito.value.hestado
      if(this.edicion){
        this.cs.update(this.carrito).subscribe(data=>{
          this.cs.list().subscribe(data=>{
            this.cs.setlist(data)
          });
        });
      }
      else{
=======
     
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
        this.cs.insert(this.carrito).subscribe(data=>{
          this.cs.list().subscribe(data=>{
            this.cs.setlist(data)
          })
        })
<<<<<<< HEAD
      }
    }
    this.router.navigate(['carritos'])
  }
  init() {
    if (this.edicion) {
      this.cs.listId(this.id).subscribe((data) => {
        this.formCarrito = new FormGroup({
          hcodigo: new FormControl(data.id),
          hestado: new FormControl(data.estado),
      
        });
      });
    }
  }
}
=======
      
    }
    this.router.navigate(['carritos'])
  }
}
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
