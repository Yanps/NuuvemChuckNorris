import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChuckNorrisService } from '../commons/services/chuck-norris.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  //
  // public properties
  //
  public query            : string;
  public category         : string;
  public total            : number;
  public isCategorySearch : boolean = false;
  public results$         : Observable<any>; 


  constructor(
    private activatedRoute    : ActivatedRoute,
    private router            : Router,
    private chuckNorrisService: ChuckNorrisService) { 

    this.activatedRoute.queryParams.subscribe(params => {
      const queryParams = params || {};
      
      this.query = queryParams.q || '';
      this.category = queryParams.c || '';
    
      if (queryParams.q) {
        this.results$ = this.getSearchResults();
        this.isCategorySearch = false;
      }

      if (queryParams.c) {
        this.results$ = this.getCategoryResult(params.c);
        this.isCategorySearch = true;
      }

    });

  }

  ngOnInit(): void {
  }


  //
  // private methods
  //

  private getSearchResults(): Observable<any> {
    return this.chuckNorrisService.searchTerm(this.query)
      .pipe(
        map(resp => {
          this.total = resp.total;
          return resp.result;
        })
      )
  }

  private getCategoryResult(category): Observable<any> {
    return this.chuckNorrisService.searchByCategory(category)
      .pipe(
        switchMap(result => {
          this.total = 1;
          return of([result]);
        })
      )
  }

  
  //
  // public methods
  //

  public backToHome(): void {
    this.router.navigateByUrl('/');
  }

  public nextResult(): void {
    this.results$ = this.getCategoryResult(this.category);
  }

}
