import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-reportesmontototalpedido',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportesmontototalpedido.component.html',
  styleUrl: './reportesmontototalpedido.component.css'
})
export class ReportesmontototalpedidoComponent implements OnInit{
  
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

  constructor(private ps: PedidoService) {}

  ngOnInit(): void {
    this.ps.getMontosPedidos().subscribe((data) => {
      this.barChartLabels = data.map((item) => "Pedido#"+ item.id_pedido.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.montototal),
          label: 'Monto recaudado por pedido es',
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
