import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CollectionItemCardComponent } from '../../../shared/components/collection-item-card-component/collection-item-card-component';
import { ItemEditFormComponent } from '../../../shared/components/item-edit-form-component/item-edit-form-component';
import { CollectionItem, CollectionItemPayload } from '../../../shared/interfaces/CollectionItem';
import { CollectionService } from '../../collections/services/collection-service';
import { CollectionItemService } from '../services/collection-item-service';

/**
 * Page d'édition d'un objet : chargement par l'id de route,
 * aperçu réel + formulaire partagé (prérempli, bouton Delete).
 */
@Component({
  imports: [ItemEditFormComponent, CollectionItemCardComponent],
  selector: 'app-collection-item-edit-component',
  styleUrl: './collection-item-edit-component.scss',
  templateUrl: './collection-item-edit-component.html',
})
export class CollectionItemEditComponent {

  private collectionService = inject(CollectionService);

  private itemService = inject(CollectionItemService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  itemId = toSignal(
    this.route.paramMap.pipe(map((params) => {
      const id = params.get('id');
      return id ? Number(id) : null;
    }))
  );

  item = signal<CollectionItem | null>(null);

  errorMessage = signal('');

  ngOnInit(): void {
    const id = this.itemId();

    if (!id) {
      this.router.navigate(['/collection']);
      return;
    }

    this.itemService.get(id).subscribe({
      next: (response) => this.item.set(response.data),
      error: (error) => {
        console.error('Erreur lors du chargement de l\'objet', error);
        this.errorMessage.set(error.error?.message ?? 'Objet introuvable');
      },
    });
  }

  /** Redirection par défaut après save/delete/cancel. */
  private navigateBack(collectionId?: number | null) {
    if (collectionId) {
      this.router.navigate(['/collection', collectionId]);
    } else {
      this.router.navigate(['/collection']);
    }
  }

  save(event: { collectionId: number | null; data: CollectionItemPayload }) {
    const id = this.itemId();

    if (!id) {
      return;
    }

    this.errorMessage.set('');

    this.itemService.update(id, event.data).subscribe({
      next: (response) => {
        this.collectionService.getCollections();
        this.navigateBack(response.data.collection_id);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
        this.errorMessage.set(error.error?.message ?? 'Mise à jour impossible pour le moment');
      },
    });
  }

  delete() {
    const id = this.itemId();

    if (!id) {
      return;
    }

    const collectionId = this.item()?.collection_id;

    this.itemService.delete(id).subscribe({
      next: () => {
        this.collectionService.getCollections();
        this.navigateBack(collectionId);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression', error);
        this.errorMessage.set(error.error?.message ?? 'Suppression impossible pour le moment');
      },
    });
  }

  cancel() {
    this.navigateBack(this.item()?.collection_id);
  }
}
