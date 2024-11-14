import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pedido } from '../../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listapedidos',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './listapedidos.component.html',
  styleUrl: './listapedidos.component.css'
})
export class ListapedidosComponent implements OnInit{
  dataSource:MatTableDataSource<Pedido>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion1','accion2']
  constructor(private ps:PedidoService){}
  ngOnInit(): void {
    this.ps.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.ps.getlist().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.ps.delete(id).subscribe((data)=>{
      this.ps.list().subscribe((data)=>{
        this.ps.setlist(data)
      });
    });
  }
}
