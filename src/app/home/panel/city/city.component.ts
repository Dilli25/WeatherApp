import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Output() passCity = new EventEmitter<string>();
  @Output() closeInput = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  passData(cityForm:NgForm){
    const cityName=cityForm.form.controls.city.value;
    console.log(cityName);
    this.passCity.emit(cityName);   
  }
  cancel(){
    console.log('cancel');
    this.closeInput.emit();  
  }

}
