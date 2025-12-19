import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  apiUrl = "https://official-joke-api.appspot.com/random_joke";
  apiUrl2 = "https://official-joke-api.appspot.com/random_ten"

  constructor(private http: HttpClient) { }

  getRandomJoke(): Observable<any> {
    const data = this.http.get<any>(this.apiUrl)
    return data;
  }



}
