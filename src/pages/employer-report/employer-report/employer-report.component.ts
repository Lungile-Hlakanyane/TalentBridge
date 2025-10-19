import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-employer-report',
  standalone: true,
  imports: [ CommonModule, NgChartsModule],
  templateUrl: './employer-report.component.html',
  styleUrl: './employer-report.component.scss'
})
export class EmployerReportComponent implements OnInit {

  reportData = {
    totalCompanies: 10,
    totalEmployees: 56,
    activeContracts: 8,
    pendingVerifications: 3
  };

  constructor(private location: Location) { }

  ngOnInit(): void {}

  goBack(){
    this.location.back(); 
  }
  

  renderChart() {
    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Companies', 'Employees', 'Contracts', 'Pending'],
        datasets: [
          {
            label: 'Report Overview',
            data: [
              this.reportData.totalCompanies,
              this.reportData.totalEmployees,
              this.reportData.activeContracts,
              this.reportData.pendingVerifications
            ],
            backgroundColor: ['#4285f4', '#0f9d58', '#f4b400', '#db4437']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

   downloadReport(format: string) {
    switch (format) {
      case 'pdf':
        alert('PDF Report Downloaded!');
        break;
      case 'excel':
        alert('Excel Report Downloaded!');
        break;
      case 'word':
        alert('Word Report Downloaded!');
        break;
      default:
        break;
    }
  }


}
