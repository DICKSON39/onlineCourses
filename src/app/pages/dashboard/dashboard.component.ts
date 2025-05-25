import { Component, OnInit } from '@angular/core';
import { Dashboard, DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats!: Dashboard;

  // PIE CHART - Enrollment Breakdown
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: 'pie' = 'pie';  // locked in as exact string literal
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // BAR CHART - Courses vs Classes
  barChartLabels: string[] = ['Courses', 'Classes'];
  barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'Count', backgroundColor: ['#4f46e5', '#6366f1'] },
  ];
  barChartType: 'bar' = 'bar'; // locked in exact literal
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 800,
      easing: 'easeOutBounce',
    },
  };

  // DOUGHNUT CHART - User Types Breakdown
  doughnutChartLabels: string[] = ['Teachers', 'Students', 'Others'];
  doughnutChartData: number[] = [];
  doughnutChartType: 'doughnut' = 'doughnut';  // locked in exact literal
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe((data) => {
      this.stats = data;

      // Pie chart data: Enrolled vs Not Enrolled
      const notEnrolled = data.totalStudents - data.totalEnrolled;
      this.pieChartLabels = ['Enrolled Students', 'Not Enrolled Students'];
      this.pieChartData = [data.totalEnrolled, notEnrolled];

      // Bar chart data: Courses and Classes counts
      this.barChartData[0].data = [data.totalCourses, data.totalClasses];

      // Doughnut chart: Teachers, Students, Others (remaining users)
      const others = data.totalUsers - (data.totalTeachers + data.totalStudents);
      this.doughnutChartData = [data.totalTeachers, data.totalStudents, others > 0 ? others : 0];
    });
  }
}
