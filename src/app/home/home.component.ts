import { Component, OnInit } from '@angular/core';
import { DataObject } from '../models/data-object';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData:DataObject[]=[];
  constructor() {
    for(let i = 0; i< 9; i++) this.weatherData.push(new DataObject(''));
    console.log(this.weatherData);
   }

  ngOnInit() {
    console.log(this.weatherData);
  }

}
