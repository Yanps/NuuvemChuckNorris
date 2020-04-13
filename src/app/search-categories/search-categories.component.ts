import { Component, OnInit } from '@angular/core';
import { ChuckNorrisService } from '../commons/services/chuck-norris.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.scss']
})
export class SearchCategoriesComponent implements OnInit {

  //
  // public properties
  //
  public categories$: Observable<string[]>;


  constructor(
    private chuckNorrisService: ChuckNorrisService,
    private router: Router) { }

  ngOnInit(): void {
    this.categories$ = this.chuckNorrisService.getCategories();
  }


  //
  // public methods
  //

  public getCategoryImage(category): string {
    return `assets/images/chuck-${category}.jpg`;
  }


  public searchByCategories(category): void {
    this.router.navigateByUrl(`/search-results?c=${category}`);
  }

}
