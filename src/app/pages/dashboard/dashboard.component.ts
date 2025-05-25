import { Component } from '@angular/core';
import { Dashboard, DashboardService } from '../../services/dashboard.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {NgChartsModule} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterLink,NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  stats!: Dashboard;

  //Pie chart Config;
  pieChartLabels: string[] = [];
  pieChartData: any[] = [];
  pieChartType: ChartType = 'pie'

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe((data) => {
      this.stats = data;


      const notEnrolled = data.totalStudents - data.totalEnrolled;
      this.pieChartLabels = ['Enrolled Students', 'Not Enrolled Students'];
      this.pieChartData = [data.totalEnrolled, notEnrolled];
    });
  }
}
