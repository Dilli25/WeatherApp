import { Component, OnInit, Input } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData: WeatherModel[] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.weatherData.push(new WeatherModel(i + 1, '', '','',''));
    }

    console.log(this.weatherData);
  }

  ngOnInit() {
    console.log(this.weatherData);
  }
  getCityWeatherData(cityWeatherData) {
    this.weatherData.forEach((item, index) => {
      if (item.id == cityWeatherData.id)
        this.weatherData[index] = cityWeatherData;
    })
    console.log(this.weatherData);
  }

}
