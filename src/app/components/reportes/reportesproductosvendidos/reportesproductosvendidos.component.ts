import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/productos.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-reportesproductosvendidos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportesproductosvendidos.component.html',
  styleUrl: './reportesproductosvendidos.component.css'
})
export class ReportesproductosvendidosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private ps:ProductoService){}
  ngOnInit(): void {
    this.ps.getProductosV().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreProducto);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Productos Mas Vendidos',
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
