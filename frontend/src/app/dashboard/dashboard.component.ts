import { Component, OnInit } from "@angular/core";
import { UserService } from "./../service/data/user.service";
import { User } from "../model/user";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label ,Color} from 'ng2-charts';
import { VirtualTimeScheduler } from "rxjs";
import {ChartsService} from '../service/data/charts.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private Userservice: UserService,private chartsService:ChartsService) {}


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `${label} €`
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['January', 'February', 'Mars', 'April','May','June','July','August','September' ,'October','November','December'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
   
  ];

  public barChartData2: ChartDataSets[] = [
   
  ];


  selectedDevice :string;
  public barChartColors: Color[] = [
    { backgroundColor: '#e56565' },
    
    
  ]
  user: User;
  users: User[];



  async doSomething($event) {
  //  console.log(this.selectedDevice);  
     this.barChartData=[];
     this.chartData = [];
     this.pieChartData = [];
     this.barChartData2=[];
    let data = await this.chartsService.getbar(localStorage.getItem("token"),this.selectedDevice);

   
    let data2 = await this.chartsService.graphelement(localStorage.getItem("token"),this.selectedDevice,'PSA');

    let data3 = await this.chartsService.graphelement(localStorage.getItem("token"),this.selectedDevice,'NISSAN');
    
    let data4 = await this.chartsService.graphelement(localStorage.getItem("token"),this.selectedDevice,'RENAULT');
        
    let data5 = await this.chartsService.piestats(localStorage.getItem("token"),this.selectedDevice,'PSA');
    let data6 = await this.chartsService.piestats(localStorage.getItem("token"),this.selectedDevice,'NISSAN');
    let data7 = await this.chartsService.piestats(localStorage.getItem("token"),this.selectedDevice,'RENAULT');
     this.barChartData.push(data);
     this.barChartData2.push(data2);
     this.barChartData2.push(data3);
     this.barChartData2.push(data4);
     this.chartData.push(data4);
     this.chartData.push(data2);
     this.chartData.push(data3);
     this.chartData.push(data4);
    this.barChartColors = [
      { backgroundColor: '#e56565' },
      { backgroundColor: '#656565' },
      { backgroundColor: '#683c3c' },
      
    ];
  



     this.pieChartData.push(data5);

     this.pieChartData.push(data6);

     this.pieChartData.push(data7);


}

  async ngOnInit() {
 
    this.Userservice.GetUser(localStorage.getItem("token")).subscribe(
      data => (this.user = data),
      error => console.log(error)
    );

    let data = await this.chartsService.getbar(localStorage.getItem("token"),2020);
    let data2 = await this.chartsService.graphelement(localStorage.getItem("token"),2020,'PSA');
    let data3 = await this.chartsService.graphelement(localStorage.getItem("token"),2020,'NISSAN');
    let data4 = await this.chartsService.graphelement(localStorage.getItem("token"),2020,'RENAULT');
    
     this.barChartData.push(data);
   

     this.barChartData2.push(data2);
     this.barChartData2.push(data3);
     this.barChartData2.push(data4);
     this.chartData.push(data2);
   
     this.chartData.push(data3);
    
     this.chartData.push(data4);

       this.barChartColors = [
      { backgroundColor: '#e56565' },
      { backgroundColor: '#656565' },
      { backgroundColor: '#683c3c' },
      
    ];

    let data5 = await this.chartsService.piestats(localStorage.getItem("token"),2020,'PSA');
    let data6 = await this.chartsService.piestats(localStorage.getItem("token"),2020,'NISSAN');
    let data7 = await this.chartsService.piestats(localStorage.getItem("token"),2020,'RENAULT');
     this.pieChartData.push(data5);
  
     this.pieChartData.push(data6);
   
     this.pieChartData.push(data7);
  }

  chartOptions = {
    responsive: true ,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `${label} €`
        }
      }]
    },
  };

  chartData = [
    
   
  ];

  chartLabels = ['January', 'February', 'Mars', 'April','May','June','July','August','September' ,'October','November','December'];


  public pieChartOptions: ChartOptions = {
    responsive: true,
    
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['PSA', 'NISSSAN', 'RENAULT'];
  public pieChartData: number[]= [] ;  
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  onChartClick(event) {
    console.log(event);
  }


}
