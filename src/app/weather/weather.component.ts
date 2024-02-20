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
    if (this.city === '') {
      this.isEmty = true;
      return;
    }
    
    this.isEmty = false;
  
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      if (convertToFahrenheit) {
        this.temperatureUnit = 'Fahrenheit';
        this.fahrenheit = Math.round((this.weatherData.main.temp * 9/5) + 32);
        console.log('F: '+this.fahrenheit);
      } else {
        this.temperatureUnit = 'Celsius';
        this.roundTemp = Math.round(this.weatherData.main.temp); 
      }
      this.iconUrl = this.iconUrl + this.weatherData.weather[0].icon + '.png';
      console.log(data);
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

  // Optionally, scroll to the top of the page
  window.scrollTo(0, 0);
  }
}
