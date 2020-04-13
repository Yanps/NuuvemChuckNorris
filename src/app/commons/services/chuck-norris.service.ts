import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisService {


  constructor(private httpService: HttpService) { }

  //
  // public methods
  //

  public getCategories(): Observable<any> {
    return this.httpService.get('/categories');
  }


  public searchByCategory(category): Observable<any> {
    const endpoint =  `/random?category=${category}`;
    return this.httpService.get(endpoint);
  }


  public searchTerm(query: string): Observable<any> {
    const endpoint = `/search?query=${query}`;
    return this.httpService.get(endpoint);
  }

}
