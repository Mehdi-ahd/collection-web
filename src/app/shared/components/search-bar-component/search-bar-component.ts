import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * La recherche est un `model` : input/output deux sens,
 * le parent filtre via `[(search)]="search"`.
 */
@Component({
  imports: [FormsModule],
  selector: 'app-search-bar-component',
  styleUrl: './search-bar-component.scss',
  templateUrl: './search-bar-component.html',
})
export class SearchBarComponent {

  search = model('');

}
