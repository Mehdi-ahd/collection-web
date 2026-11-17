import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CollectionService } from '../../../features/collections/services/collection-service';

@Component({
  imports: [RouterLink],
  selector: 'app-main-menu-component',
  styleUrl: './main-menu-component.scss',
  templateUrl: './main-menu-component.html',
})
export class MainMenuComponent {

  authService = inject(AuthService);

  collectionService = inject(CollectionService);

  router = inject(Router);

  // On expose les signaux (pas leur valeur figée) : le menu reste réactif.
  currentUser = this.authService.currentUser;

  collections = this.collectionService.collections;

  selectedCollection = this.collectionService.selectedCollection;

  isLoading = this.collectionService.isLoading;

  logout() {
    // clearSession() est déjà géré par le service ; on ne redirige
    // qu'une fois la déconnexion (et sa chute d'erreur) terminée.
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
