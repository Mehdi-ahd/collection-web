import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CollectionItemCardComponent } from '../../../shared/components/collection-item-card-component/collection-item-card-component';
import { SearchBarComponent } from '../../../shared/components/search-bar-component/search-bar-component';
import { CollectionService } from '../services/collection-service';

@Component({
  imports: [RouterLink, CollectionItemCardComponent, SearchBarComponent],
  selector: 'app-collection-detail-component',
  styleUrl: './collection-detail-component.scss',
  templateUrl: './collection-detail-component.html',
})
export class CollectionDetailComponent {

  private collectionService = inject(CollectionService);

  private route = inject(ActivatedRoute);

  collections = this.collectionService.collections;

  errorMessage = this.collectionService.errorMessage;

  /** Recherche partagée avec la SearchBar (two-way). */
  search = signal('');

  /** id de collection lu depuis l'URL (/collection ou /collection/:id). */
  private routeId = toSignal(
    this.route.paramMap.pipe(map((params) => {
      const id = params.get('id');
      return id ? Number(id) : undefined;
    }))
  );

  /**
   * Collection affichée : celle de l'URL, sinon la première
   * de la liste (comportement par défaut du cours).
   */
  selected = computed(() => {
    const id = this.routeId();
    const list = this.collections();
    return list.find((collection) => collection.id === id) ?? list[0] ?? null;
  });

  /** Objets filtrés par la recherche (insensible à la casse). */
  displayedItems = computed(() => {
    const items = this.selected()?.items ?? [];
    const query = this.search().toLowerCase().trim();

    return query
      ? items.filter((item) => item.name.toLowerCase().includes(query))
      : items;
  });

}
