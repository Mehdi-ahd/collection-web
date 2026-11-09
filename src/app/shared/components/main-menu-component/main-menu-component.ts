import { CollectionService } from './../../../features/collections/services/collection-service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { User } from '../../interfaces/User';
import { Collection } from '../../interfaces/Collection';

@Component({
  imports: [],
  selector: 'app-main-menu-component',
  styleUrl: './main-menu-component.scss',
  templateUrl: './main-menu-component.html',
})
export class MainMenuComponent implements OnInit {
  authService = inject(AuthService);
  collectionService = inject(CollectionService);

  currentUser = this.authService.currentUser();
  token = this.authService.token();

  collections = signal<Collection[]>([]);

  isLoading = false;

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    this.isLoading = true;

    this.collectionService.index().subscribe({
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

  logout() {
    this.authService.logout();
  }

}
