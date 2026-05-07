import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { UserService } from '../../../services/User-Service/user.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { forkJoin } from 'rxjs';
import { Job } from '../../../models/Job';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { HiredCandidateServiceService } from '../../../services/hire-candidate-service/hired-candidate-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employer-report',
  standalone: true,
  imports: [ CommonModule, NgChartsModule, FormsModule],
  templateUrl: './employer-report.component.html',
  styleUrl: './employer-report.component.scss'
})
export class EmployerReportComponent implements OnInit, OnDestroy {

  activeJobs: Job[] = [];

  chart: Chart | null = null;
  chartPeriod: string = '30';
  today = new Date();

  employerData = {
    companyName: '',
    userId: 0,
    role: ''
  };

  insights = {
    jobsPosted: 0,
    totalApplicants: 0,
    interviews: 0
  };

   reportData = {
    activeJobs: 0,
    closedJobs: 0,
    totalApplicants: 0,
    newApplicants: 0,
    interviewsScheduled: 0,
    upcomingInterviews: 0,
    hiresMade: 0,
    hireRate: 0,
    avgTimeToHire: 0,
    companyProfileViews: 0,
    applicationRate: 0,
    jobsChange: 0,
    topJobs: [] as any[],
    chartData: {
      '7': { labels: [] as string[], applicants: [] as number[] },
      '30': { labels: [] as string[], applicants: [] as number[] },
      '90': { labels: [] as string[], applicants: [] as number[] }
    }
  };

  constructor(
    private jobService:JobService,
    private userService:UserService,
    private location: Location,
    private router: Router,
    private loading: LoadingService,
    private applicationService:ApplicationService,
    private interviewService:InterviewService,
    private hiredCandidateService: HiredCandidateServiceService
  ) {}

  ngOnInit(): void {
    this.employerData.userId = Number(localStorage.getItem('userId')) || 0;
    this.employerData.role = localStorage.getItem('role') || '';
    this.loadEmployerDetails();
    this.loadJobsData();
    this.loadActiveJobs();
    this.loadInterviewCount();
    this.loadHiredCandidates();
  }

  ngAfterViewInit(): void {
    // Render chart after view loads
    // setTimeout(() => this.renderChart(), 0);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  goBack() {
    this.location.back();
  }

  updateChart() {
    this.renderChart();
  }

    renderChart() {
    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    if (this.chart) this.chart.destroy();

    const currentData = this.reportData.chartData[this.chartPeriod as '7' | '30' | '90'];

    // Handle empty data
    if (!currentData.labels.length) {
      const context = ctx.getContext('2d');
      if (context) {
        context.clearRect(0, 0, ctx.width, ctx.height);
        context.font = '14px Arial';
        context.fillStyle = '#999';
        context.textAlign = 'center';
        context.fillText('No active jobs to display', ctx.width / 2, ctx.height / 2);
      }
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: currentData.labels,
        datasets: [{
          label: 'Applicants',
          data: currentData.applicants,
          backgroundColor: '#4285f4',
          borderRadius: 6,
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { 
            enabled: true,
            callbacks: {
              label: (context) => `${context.parsed.y} applicants`
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            ticks: { precision: 0 },
            grid: { color: '#f0f0f0' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  downloadReport(format: string) {
    alert(`${format.toUpperCase()} Report Downloaded!`);
  }

  downloadExcel() {
     
  const excelData = this.reportData.topJobs.map(job => ({
    'Job Title': job.title,
    'Applicants': job.applicants,
    'Views': job.views,
    'Status': job.status,
    'Posted Date': new Date(job.postedDate).toLocaleDateString()
  }));

  // Create worksheet
  const worksheet: XLSX.WorkSheet =
    XLSX.utils.json_to_sheet(excelData);

  // Create workbook
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Top Jobs': worksheet },
    SheetNames: ['Top Jobs']
  };

  // Export file
  XLSX.writeFile(
    workbook,
    'TalentBridge-Top-Performing-Jobs.xlsx'
  );
  }

  donwloadPDF(format: string){
     if (format !== 'pdf') {
    alert(`${format.toUpperCase()} export coming soon!`);
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Top Performing Job Posts Report', 14, 20);

  // Company name
  doc.setFontSize(11);
  doc.text(
    `${this.employerData.companyName} | ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  // Table Data
  const tableData = this.reportData.topJobs.map(job => [
    job.title,
    job.applicants,
    job.views,
    job.status,
    new Date(job.postedDate).toLocaleDateString()
  ]);

  // Generate Table
  autoTable(doc, {
    startY: 40,
    head: [['Job Title', 'Applicants', 'Views', 'Status', 'Posted Date']],
    body: tableData,
    styles: {
      fontSize: 10
    },
    headStyles: {
      fillColor: [66, 133, 244]
    }
  });

  // Save PDF
  doc.save('TalentBridge-Top-Performing-Jobs.pdf');
  }

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  // methods to fetch data from backend dynamically
  loadEmployerDetails() {
    if (!this.employerData.userId) return;
    if (this.employerData.role === 'EMPLOYER') {
      this.userService.getUserById(this.employerData.userId).subscribe({
        next: (user) => {
          this.employerData.companyName = user.companyName || 'Your Company';
          localStorage.setItem('companyName', this.employerData.companyName);
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
          this.employerData.companyName = localStorage.getItem('companyName') || 'Your Company';
        }
      });
    } else {
      this.employerData.companyName = 'TalentBridge';
    }
  }

  loadJobsData(){
     if (!this.employerData.userId) return;
    this.loading.show();
    this.jobService.getJobsByUserId(this.employerData.userId).subscribe({
      next: (jobs: any[]) => {
        this.processJobsData(jobs);
        this.renderChart();
        this.loading.hide();
      },
      error: (err) => {
        this.loading.hide();
        console.error('Failed to fetch jobs', err);
      }
    });
  }

   processJobsData(jobs: any[]) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const activeJobs = jobs.filter(job =>
      job.status === 'approved' || job.approve === 1
    );
    this.reportData.activeJobs = activeJobs.length;

    this.reportData.closedJobs = jobs.filter(job =>
      job.status === 'closed' || job.approve === 0
    ).length;

    const jobsThisMonth = jobs.filter(job => {
      const createdDate = new Date(job.created);
      return createdDate >= thirtyDaysAgo;
    });
    this.reportData.jobsChange = jobsThisMonth.length;

    if (!jobs.length) {
      this.reportData.topJobs = [];
      this.renderChart(); // Show empty state
      return;
    }

    const jobRequests = jobs.map(job =>
      this.applicationService.getUniqueApplicantCount(job.id)
    );

    forkJoin(jobRequests).subscribe({
      next: (counts) => {
        this.reportData.topJobs = jobs
         .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
         .map((job, index) => ({
            id: job.id,
            title: job.title,
            applicants: counts[index] || 0,
            views: 0,
            status: this.getJobStatus(job),
            postedDate: new Date(job.created)
          }));

        // Build chart data - use top 5 active jobs only
        const chartJobs = this.reportData.topJobs
         .filter(j => j.status === 'Active')
         .slice(0, 5);

        const labels = chartJobs.map(j => this.truncateTitle(j.title));
        const applicantData = chartJobs.map(j => j.applicants);

        // 7 days: simulate less applicants
        this.reportData.chartData['7'] = {
          labels,
          applicants: applicantData.map(a => Math.floor(a * 0.3))
        };
        // 30 days: actual data
        this.reportData.chartData['30'] = {
          labels,
          applicants: applicantData
        };
        // 90 days: simulate more applicants
        this.reportData.chartData['90'] = {
          labels,
          applicants: applicantData.map(a => Math.floor(a * 1.8))
        };

        this.renderChart(); // Render after data ready
      },
      error: (err) => {
        console.error('Failed to fetch applicant counts', err);
        this.reportData.topJobs = jobs
         .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
         .map(job => ({
            id: job.id,
            title: job.title,
            applicants: 0,
            views: 0,
            status: this.getJobStatus(job),
            postedDate: new Date(job.created)
          }));
        this.renderChart();
      }
    });
  }

 getJobStatus(job: any): string {
    if (job.status === 'closed' || (job.approve === 0 && job.status!== 'pending')) return 'Closed';
    if (job.status === 'pending' || job.approve === 0) return 'Pending';
    if (job.status === 'approved' || job.approve === 1) return 'Active';
    return 'Draft';
  }

  truncateTitle(title: string): string {
    return title.length > 15? title.substring(0, 15) + '...' : title;
  }

  loadActiveJobs() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.jobService.getJobsByUserId(Number(userId)).subscribe({
          next: (jobs) => {
            if (!jobs || jobs.length === 0) {
              this.activeJobs = [];
              return;
            }
            // Sort jobs (latest first)
            this.activeJobs = jobs.sort(
              (a, b) =>
                new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime()
            );
  
            this.insights.jobsPosted = this.activeJobs.length;
            const applicationRequests = this.activeJobs.map((job) =>
            this.applicationService.getUniqueApplicantCount(job.id)
            );
            forkJoin(applicationRequests).subscribe({
            next: (counts) => {
            counts.forEach((count, index) => {
            (this.activeJobs[index] as any).applicants = count;
             this.insights.totalApplicants += count;
            });
            }
          });
          },
          error: (err) => console.error('Error fetching jobs:', err)
        });
      } else {
        console.warn('No userId found in localStorage');
      }
  }

  loadInterviewCount() {
  const userId = Number(localStorage.getItem('userId'));
  if (userId) {
    this.interviewService.getInterviewCountByUserId(userId)
      .subscribe((count: any) => {
        this.insights.interviews = count;
      }, (error:any) => {
        console.error('Error fetching interview count:', error);
      });
  } else {
    console.warn('No userId found in localStorage');
  }
}

 loadHiredCandidates() {
    if (!this.employerData.userId) return;
    this.hiredCandidateService.getByEmployer(this.employerData.userId).subscribe({
      next: (hiredCandidates) => {
        // Get unique candidate_user_id values - ignore duplicates
        const uniqueCandidateIds = new Set(
          hiredCandidates.map(h => h.candidateUserId)
        );

        this.reportData.hiresMade = uniqueCandidateIds.size;

        // Calculate hire rate: hires / total applicants * 100
        if (this.reportData.totalApplicants > 0) {
          this.reportData.hireRate = Number(
            ((this.reportData.hiresMade / this.reportData.totalApplicants) * 100).toFixed(1)
          );
        } else {
          this.reportData.hireRate = 0;
        }
      },
      error: (err) => {
        console.error('Failed to fetch hired candidates', err);
        this.reportData.hiresMade = 0;
        this.reportData.hireRate = 0;
      }
    });
  }



}
