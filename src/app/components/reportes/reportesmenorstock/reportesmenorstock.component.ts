import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/productos.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-reportesmenorstock',
  standalone: true,
  imports:[BaseChartDirective],
  templateUrl: './reportesmenorstock.component.html',
  styleUrl: './reportesmenorstock.component.css'
})
export class ReportesmenorstockComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private ps:ProductoService){}
  ngOnInit(): void {
    this.ps.getProductosM().subscribe((data) => {
      this.barChartLabels = data.map((item) => "Producto: "+ item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.stock),
          label: 'Stock',
          backgroundColor: [
            '#29c694', // Navy
            '#099c6e', // Dark Blue
            '#abf0db', // Medium Blue
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
  }

