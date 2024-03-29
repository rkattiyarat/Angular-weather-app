import { Component , OnInit} from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weatherdata } from '../weatherdata';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  city: string ='';
  weatherData: any;
  isEmty: boolean = false;
  roundTemp: number = 0;
  iconUrl: string = 'http://openweathermap.org/img/wn/';
  fahrenheit: number = 0;
  temperatureUnit: string = 'Celsius' || 'Fahrenheit';
  searchResult:undefined | Weatherdata[];

  constructor(private weatherService:WeatherService, private fb: FormBuilder) { }

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

  searchCity(query: KeyboardEvent) {
    if (query){
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.weatherService.searchCities(element.value).subscribe((result)=>{
        console.warn(result);
        this.searchResult = result;
      })
    }
    // reset the search result
    this.searchResult = undefined;
  }

  setSelectedCity(selectedCity: Weatherdata) {
    this.city = selectedCity.name; // Assign the selected city to the input field
    this.searchResult = undefined; // Clear the search results
  }
 

onReset() {
  window.location.reload();
  }
}
