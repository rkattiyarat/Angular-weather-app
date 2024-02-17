import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city: string ='';
  weatherData: any;
  isEmty: boolean = false;
  constructor(private weatherService:WeatherService) { }

  ngOnInit() {}

  getWeather() {
  if(this.city === '') {
    this.isEmty = true;
      // color the input field red
  } else {
    this.isEmty = false;
  }
  if(!this.isEmty) {
    this.weatherService.getWeather(this.city).subscribe(data => {this.weatherData = data; console.log(data);});
    // clear the input field
    this.city = '';
  }
}
}
