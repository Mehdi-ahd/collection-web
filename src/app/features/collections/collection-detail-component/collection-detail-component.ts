import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Collection } from '../../../shared/interfaces/Collection';
import { CollectionService } from '../services/collection-service';

@Component({
  imports: [],
  selector: 'app-collection-detail-component',
  styleUrl: './collection-detail-component.scss',
  templateUrl: './collection-detail-component.html',
})
export class CollectionDetailComponent {
  authService = inject(AuthService);
  CollectionService = inject(CollectionService);

  user = this.authService.currentUser();

  collections = signal<Collection[]>([]);

  isLoading = false;

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    this.isLoading = true;

    this.CollectionService.index().subscribe({
      next: (response) => {
        this.collections.set(response.data);
        this.isLoading = false;
        console.log(response);
      },

      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }
}
