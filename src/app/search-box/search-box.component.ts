import { Component, OnInit, Input } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  //
  // public properties
  //
  @Input('query') query: string;
  public faSearch  : any  = faSearch;
  public searchForm: FormGroup;


  constructor(
    private router: Router,
    private fb    : FormBuilder) { 
    }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {'search': this.query}
    );
  }


  //
  // public methods
  //

  public search(formGroup: FormGroup): void {
    const query = formGroup.value.search;
    this.router.navigateByUrl(`/search-results?q=${query}`);
  }

}
