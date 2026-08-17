import { Component,AfterViewInit  } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit {

  ngAfterViewInit() {

    // Line Chart
    new Chart('queryChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Queries',
          data: [10, 25, 15, 40, 35, 60]
        }]
      }
    });

    // Bar Chart (Candle-like look)
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [100, 150, 120, 200, 180, 250]
        }]
      }
    });

    // Donut Chart
    new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: ['HR', 'IT', 'Accounts', 'Admin'],
        datasets: [{
          data: [20, 45, 15, 20]
        }]
      }
    });

  }
}
