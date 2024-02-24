import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Weatherdata } from './weatherdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'd1381a691fd9d803e38585fb280157d5';
  searchOption = [];
  public postData: Weatherdata[];

  constructor(private http:HttpClient) {}

   getWeather(city: string) {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    
    return this.http.get(url);
  }

  getSuggestedCities(query: string):Observable<Weatherdata[]> {
    return this.http.get<Weatherdata[]>(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
  }
}
