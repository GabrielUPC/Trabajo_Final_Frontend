import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tienda } from '../../../models/Tienda';
import { TiendaService } from '../../../services/tienda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-creaeditatiendas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule   
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditatiendas.component.html',
  styleUrl: './creaeditatiendas.component.css',
})
export class CreaeditatiendasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tienda: Tienda = new Tienda();
  edicion:boolean=false
  id:number=0
  constructor(
    private formbuilder: FormBuilder,
    private ts: TiendaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init()
    })
    this.form= this.formbuilder.group({
      hcodigo:[''],
      hnombre:['',Validators.required],
      hdescripcion:['',Validators.required],
      hdireccion:['',Validators.required]
    })
  }
  insertar():void{
    if(this.form.valid){
      this.tienda.idTienda=this.form.value.hcodigo;
      this.tienda.nombre=this.form.value.hnombre;
      this.tienda.descripcion=this.form.value.hdescripcion;
      this.tienda.direccion=this.form.value.hdireccion;
      if(this.edicion){
        this.ts.update(this.tienda).subscribe(data=>{
          this.ts.list().subscribe(data=>{
            this.ts.setlist(data)
          })
        })
      }
      else
      {
        this.ts.insert(this.tienda).subscribe(data=>{
          this.ts.list().subscribe(data=>{
           this.ts.setlist(data);
          })
        });
      }
      
    }
    this.router.navigate(['tiendas']);
  }
  init(){
    if(this.edicion){
      this.ts.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.idTienda),
          hnombre:new FormControl(data.nombre),
          hdescripcion:new FormControl(data.descripcion),
          hdireccion:new FormControl(data.direccion)
        })
      })
    }
  }
}
