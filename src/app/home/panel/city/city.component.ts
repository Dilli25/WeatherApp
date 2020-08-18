import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent{
  @Output() passCity = new EventEmitter<string>();
  @Output() closeInput = new EventEmitter();
  @Input() error:boolean;
  constructor() { }


  passData(cityForm:NgForm){
    const cityName=cityForm.form.controls.city.value;
    this.passCity.emit(cityName);   
  }
  cancel(){
    this.closeInput.emit();  
  }

}
