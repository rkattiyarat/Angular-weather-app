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
  suggestedCities: any[] = [];

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
  }

  onCityInput(event: any) {
    const query = event.target.value;
    if (query.trim() === '') {
      this.suggestedCities = [];
      return;
    }
    this.weatherService.getSuggestedCities(query).subscribe(
      (data: any) => {
        this.suggestedCities = data.list;
      },
      (error) => {
        console.error('Error fetching suggested cities:', error);
      }
    );
  }

  onSelectCity(city: string) {
    this.city = city;
    this.suggestedCities = []; // Clear the suggestions when a city is selected
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
      return;
    }
    this.isEmty = false;
    this.weatherService.getWeather(this.city).subscribe(
      (data: Weatherdata) => {
      if (data && data.name){
      this.weatherData = data;
        if (convertToFahrenheit) {
          this.temperatureUnit = 'Fahrenheit';
          this.fahrenheit = Math.round((this.weatherData.main.temp * 9/5) + 32);
        } else {
          this.temperatureUnit = 'Celsius';
          this.roundTemp = Math.round(this.weatherData.main.temp); 
        }
      this.iconUrl = this.iconUrl + this.weatherData.weather[0].icon + '.png'; 
      }
    (error) => {
      console.error('Error fetching weather data:', error);
      }
    });
    // Clear the input field
    this.city = '';
  }

onReset() {
  window.location.reload();
}
}
