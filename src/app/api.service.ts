import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  key:string='07639de8f90a9e09ffcc723d8bbd1afc';

  constructor(private http:HttpClient) { }

  getWeatherData(cityName){
     return this.http.get<object>('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+this.key);
  }
}
