import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Weatherdata } from './weatherdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'd1381a691fd9d803e38585fb280157d5';

  constructor(private http:HttpClient) {}

   getWeather(city: string) {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    
    return this.http.get(url);
  }

  // getSuggestedCities(query: string):Observable<Weatherdata[]> {
  //   const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`;
  //   return this.http.get<Weatherdata[]>(url);
  // }

  searchCities(query: string) {
    return this.http.get<Weatherdata[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`);
  }
}
