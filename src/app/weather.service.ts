import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'd1381a691fd9d803e38585fb280157d5';


  constructor(private http:HttpClient) {
   
   }
   getWeather(city: string) {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    // clear the input field
    return this.http.get(url);
  }
}