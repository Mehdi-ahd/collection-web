import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { CollectionItem, CollectionItemPayload } from '../../../shared/interfaces/CollectionItem';

/**
 * Point d'accès unique au backend pour les objets de collection.
 * La création est rattachée à une collection : POST /collection/{id}/item.
 */
@Service()
export class CollectionItemService {

  http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  create(collectionId: number, item: CollectionItemPayload): Observable<ApiResponse<CollectionItem>> {
    return this.http.post<ApiResponse<CollectionItem>>(
      `${this.apiUrl}/collection/${collectionId}/item`,
      item
    );
  }

  get(id: number): Observable<ApiResponse<CollectionItem>> {
    return this.http.get<ApiResponse<CollectionItem>>(`${this.apiUrl}/item/${id}`);
  }

  update(id: number, item: CollectionItemPayload): Observable<ApiResponse<CollectionItem>> {
    return this.http.put<ApiResponse<CollectionItem>>(`${this.apiUrl}/item/${id}`, item);
  }

  delete(id: number): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(`${this.apiUrl}/item/${id}`);
  }
}
