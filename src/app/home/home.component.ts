import { Component, OnInit, Input } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';
import { Data } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData: WeatherModel[] = [];
  tempWeatherData: WeatherModel[] = [];
  id:any;
  constructor(private weatherService:ApiService) {
    for (let i = 0; i < 9; i++) {
      this.tempWeatherData.push(new WeatherModel(i + 1,null,'', '','',''));
    }

    console.log(this.weatherData);
  }

  ngOnInit() {
    const storedData = this.getFromStorage();
    if(storedData != null ){
      console.log("stored data : "+ storedData);
      this.weatherData = JSON.parse(storedData);
      this.triggerSchedule();
    }else{
      this.weatherData=  this.tempWeatherData;
    }
  }
  getCityWeatherData(cityWeatherData) {
    this.weatherData.forEach((item, index) => {
      if (item.id == cityWeatherData.id)
        this.weatherData[index] = cityWeatherData;
    })
    console.log(this.weatherData);
    this.callIntervalMethod();
    this.storeWeatherData();
  }

  storeWeatherData(){
    localStorage.setItem('WeatherData',JSON.stringify(this.weatherData));
  }
  getFromStorage(){
  return localStorage.getItem('WeatherData');
  }

  getAllCityWeatherData(){
    const cityIds = this.weatherData.map(obj => obj.cityId).filter(city=>city!=null).join(',');
    console.log(cityIds);
    this.weatherService.getAllWeaterData(cityIds).subscribe((data)=>{
      console.log(data);
      data.list.forEach(updatedObject => {
        this.weatherData.forEach(oldObject=>{
          if(oldObject.cityId==updatedObject.id){
            oldObject.climate=updatedObject['weather']['0'].main;
            oldObject.windSpeed=(updatedObject['wind'].speed * 1.16).toString();
            oldObject.temperature= (updatedObject['main'].temp - 273).toString();
          }

        });
      });

    });
    this.storeWeatherData();
    console.log(this.weatherData);
  }

  triggerSchedule(){
   
   this.id =setInterval(() => {
      this.getAllCityWeatherData();
    }, 10000);
  }
  
  callIntervalMethod(){
    const isWeatherDataAvailable = localStorage.getItem('weather_check');
    if(!isWeatherDataAvailable){
      this.triggerSchedule();
      localStorage.setItem('weather_check','true');
    }
  }

}
