import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //
  // private properties
  //
  private url: string = 'https://api.chucknorris.io/jokes';


  constructor() { }


  //
  // private methods
  //

  private createHttpObservable(endpoint: string, method: string): Observable<any> {
    return Observable.create(observer => {
      const url = `${this.url}${endpoint}`;
      const controller = new AbortController();
      const signal = controller.signal;
      const request = new Request(url, {
        method : method,
        signal : signal
      });

      fetch(request)
        .then(response => {

          if (response.ok) {
            return response.json();
          }
          
          observer.error('Request failed width status code: ' + response.status);
        
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });

        return () => controller.abort();
    });
  }


  //
  // public methods
  //
  
  public get(endpoint: string): Observable<any> {
    return this.createHttpObservable(endpoint, 'GET');
  }


}
