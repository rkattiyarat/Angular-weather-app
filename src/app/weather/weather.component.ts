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
  roundTemp: number = 0;
  iconUrl: string = 'http://openweathermap.org/img/wn/';
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
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      this.roundTemp = Math.round(this.weatherData.main.temp); 
      this.iconUrl = this.iconUrl + this.weatherData.weather[0].icon + '.png';
      console.log(data);
    });
    // clear the input field
    this.city = '';
  }
}

onReset() {
  this.city = '';
  this.weatherData = null;
  this.roundTemp = 0;
  this.iconUrl = 'http://openweathermap.org/img/wn/';
  }
}
