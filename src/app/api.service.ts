import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getWeatherData(cityName){
     return this.http.get<any>(environment.baseURL+'weather?q='+cityName+'&appid='+environment.APIKEY);
  }
  getAllWeaterData(cityIds){
    return this.http.get<any>(environment.baseURL+'group?id='+cityIds+'&appid='+environment.APIKEY);
  }
}
