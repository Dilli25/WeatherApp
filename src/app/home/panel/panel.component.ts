import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  showInput:boolean=false;
  constructor(private weatherService:ApiService) { }
  
  ngOnInit() {
  }
  callInput(){
    this.showInput=true;
  }
  getCityValue(cityName){
    console.log("city",cityName);
    this.weatherService.getWeatherData(cityName).subscribe((data)=>{
      console.log(data);
    });

  }

}
