import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weatherdata } from '../weatherdata';


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
  fahrenheit: number = 0;
  temperatureUnit: string = 'Celsius' || 'Fahrenheit';

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
  }

  getWeatherInCelcius() {
    this.getWeatherData();
  }

  getWeatherInFahrenheit() {
    this.getWeatherData(true);
  }

  private getWeatherData(convertToFahrenheit: boolean = false) {
    if (this.city === undefined || this.city === null || this.city.trim() === '') {
      this.isEmty = true;
      let error = document.getElementById('error');
      if (error){
        error.innerHTML = 'Please enter a valid city';
      }
      return;
    }

    
    this.isEmty = false;
  
    this.weatherService.getWeather(this.city).subscribe(data => {
      console.log(data);
      this.weatherData = data;
      //console.log('weatherData: '+this.weatherData);
   
      
      if (convertToFahrenheit) {
        this.temperatureUnit = 'Fahrenheit';
        this.fahrenheit = Math.round((this.weatherData.main.temp * 9/5) + 32);
      } else {
        this.temperatureUnit = 'Celsius';
        this.roundTemp = Math.round(this.weatherData.main.temp); 
      }
      this.iconUrl = this.iconUrl + this.weatherData.weather[0].icon + '.png';
      // console.log(data);
    });
    // Clear the input field
    this.city = '';
  }

onReset() {
  this.city = '';
  // Reset weather data
  this.weatherData = null;
  this.roundTemp = 0;
  this.fahrenheit = 0;
  this.temperatureUnit = 'Celsius';
  const errorElement = document.getElementById('error');
  const emptyBorder = document.getElementById('input-user');
  if (errorElement) {
    errorElement.innerHTML = '';
    emptyBorder.style.border = 'none';
  }
  //scroll to the top of the page
  window.scrollTo(0, 0);
  }
}
