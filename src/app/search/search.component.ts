import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: string = '';

  @Output()
  searchTextEmitter: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    console.log('search button clicked!');
    this.searchTextEmitter.emit(this.searchText);
  }
}
