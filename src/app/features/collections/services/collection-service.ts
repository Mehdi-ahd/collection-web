import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { Collection } from '../../../shared/interfaces/Collection';

/**
 * Point d'accès unique au backend pour les collections.
 * Le composant n'appelle jamais HttpClient directement.
 */
@Service()
export class CollectionService {

  http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  /** Toutes les collections de l'utilisateur connecté. */
  collections = signal<Collection[]>([]);

  /** Collection affichée dans la page de détail (choisie via le menu ou l'URL). */
  selectedCollection = signal<Collection | null>(null);

  isLoading = signal(false);

  errorMessage = signal('');

  index(): Observable<ApiResponse<Collection[]>> {
    return this.http.get<ApiResponse<Collection[]>>(`${this.apiUrl}/collection`);
  }

  /**
   * Charger les collections de l'utilisateur connecté.
   * Appelé par le MainLayout à l'entrée dans la zone protégée.
   */
  getCollections() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.index().subscribe({
      next: (response) => {
        this.collections.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des collections', error);
        this.errorMessage.set('Impossible de charger les collections');
        this.isLoading.set(false);
      }
    })
  }

  /**
   * Sélectionner la collection affichée.
   * Un id inconnu retombe sur la première collection (comportement du cours).
   */
  select(collectionId: number | undefined) {
    const found = collectionId
      ? this.collections().find((collection) => collection.id === collectionId)
      : undefined;

    this.selectedCollection.set(found ?? this.collections()[0] ?? null);
  }
}
