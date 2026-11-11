import { Component, input } from '@angular/core';
import { CollectionItem } from '../../interfaces/CollectionItem';

/**
 * Carte d'un objet de collection : utilisée par la grille du détail
 * ET l'aperçu des formulaires create/edit. Une seule source de vérité.
 */
@Component({
  imports: [],
  selector: 'app-collection-item-card-component',
  styleUrl: './collection-item-card-component.scss',
  templateUrl: './collection-item-card-component.html',
})
export class CollectionItemCardComponent {

  item = input.required<CollectionItem>();

}
