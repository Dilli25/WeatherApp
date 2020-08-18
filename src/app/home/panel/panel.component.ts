import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { WeatherModel } from '../../models/weatherModel';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  showInput: boolean = false;
  showWeatherData: boolean = false;
  showPlus: boolean = false;
  errorFlag: boolean = false;
  @Input('model') cityWeather: WeatherModel;
  @Output() passCityWeatherData = new EventEmitter<WeatherModel>();
  constructor(private weatherService: ApiService) { }

  ngOnInit() {
    if (this.cityWeather.cityName == "") {
      this.showPlus = true;
    } else {
      this.showWeatherData = true;
    }
  }

  callInput() {
    this.showPlus = false;
    this.showInput = true;
    this.showWeatherData = false;
  }

  getCityValue(cityName) {
    this.weatherService.getWeatherData(cityName).subscribe((data) => {
      this.cityWeather.cityName = cityName;
      this.cityWeather.climate = data['weather']['0'].main;
      this.cityWeather.cityId = data.id;
      this.cityWeather.windSpeed = (data['wind'].speed * 1.16).toString();
      this.cityWeather.temperature = (data['main'].temp - 273).toString();
      this.passCityWeatherData.emit(this.cityWeather);
      this.showInput = false;
      this.showWeatherData = true;
      this.showPlus = false;
    },
      err => {
        if (err.error.cod == '404') {
          this.errorFlag = true;
        }
      });
  }

  getImagePath(climate) {
    if (climate.toLowerCase().includes('clouds')) {
      return './assets/img/cloudy.png';
    } else if (climate.toLowerCase().includes('rain') || climate.toLowerCase().includes('drizzle')) {
      return './assets/img/rainy.png';
    } else if (climate.toLowerCase().includes('sunny') | climate.toLowerCase().includes('clear')) {
      return './assets/img/sunny.png';
    } else if (climate.toLowerCase().includes('snow')) {
      return './assets/img/snow.png';
    } else if (climate.toLowerCase().includes('thunderstorm')) {
      return './assets/img/thunderstrom.png';
    }
    else if (climate.toLowerCase().includes('mist')) {
      return './assets/img/mist.png';
    }

  }

  hideInput() {
    this.showInput = false;
    this.errorFlag = false;
    if (this.cityWeather.cityName == "") {
      this.showPlus = true;
      this.showWeatherData = false;
    } else {
      this.showPlus = false;
      this.showWeatherData = true;
    }
  }

}
