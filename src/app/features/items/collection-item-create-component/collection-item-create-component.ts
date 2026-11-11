import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CollectionItemCardComponent } from '../../../shared/components/collection-item-card-component/collection-item-card-component';
import { ItemEditFormComponent } from '../../../shared/components/item-edit-form-component/item-edit-form-component';
import { CollectionItem, CollectionItemPayload } from '../../../shared/interfaces/CollectionItem';
import { CollectionService } from '../../collections/services/collection-service';
import { CollectionItemService } from '../services/collection-item-service';

/**
 * Page de création d'un objet : aperçu fantôme + formulaire partagé.
 */
@Component({
  imports: [ItemEditFormComponent, CollectionItemCardComponent],
  selector: 'app-collection-item-create-component',
  styleUrl: './collection-item-create-component.scss',
  templateUrl: './collection-item-create-component.html',
})
export class CollectionItemCreateComponent {

  private collectionService = inject(CollectionService);

  private itemService = inject(CollectionItemService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  collections = this.collectionService.collections;

  selectedCollection = this.collectionService.selectedCollection;

  errorMessage = signal('');

  /** Pré-sélection via l'URL (ex: navigué depuis une collection précise). */
  private routeCollectionId = toSignal(
    this.route.paramMap.pipe(map((params) => {
      const id = params.get('collectionId');
      return id ? Number(id) : null;
    }))
  );

  /** Aperçu fantôme (état initial : Common, 0 €). */
  previewItem = computed<CollectionItem>(() => ({
    id: 0,
    collection_id: 0,
    name: "Nom de l'objet",
    description: "Description de l'objet…",
    image: '',
    rarity: 'Common',
    price: 0,
  }));

  save(event: { collectionId: number | null; data: CollectionItemPayload }) {
    // Priorité : choix du formulaire → collection affichée → première.
    const collectionId = event.collectionId
      ?? this.routeCollectionId()
      ?? this.selectedCollection()?.id
      ?? this.collections()[0]?.id;

    if (!collectionId) {
      this.errorMessage.set('Aucune collection disponible');
      return;
    }

    this.itemService.create(collectionId, event.data).subscribe({
      next: () => {
        // Le menu (items-count) et la grille doivent refléter le nouvel objet.
        this.collectionService.getCollections();
        this.router.navigate(['/collection', collectionId]);
      },
      error: (error) => {
        console.error('Erreur lors de la création', error);
        this.errorMessage.set(error.error?.message ?? 'Création impossible pour le moment');
      },
    });
  }

  cancel() {
    this.router.navigate(['/collection', this.selectedCollection()?.id ?? '']);
  }
}
