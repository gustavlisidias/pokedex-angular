import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  public search(value: string){
    this.emmitSearch.emit(value);
  }

}
