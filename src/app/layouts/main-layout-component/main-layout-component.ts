import { Component, inject, OnInit } from '@angular/core';
import { MainMenuComponent } from '../../shared/components/main-menu-component/main-menu-component';
import { RouterOutlet } from '@angular/router';
import { CollectionService } from '../../features/collections/services/collection-service';
import { AuthService } from '../../core/services/auth-service';

/**
 * Shell de la zone protégée : menu latéral + contenu routé.
 * Le header (titre + recherche) vit dans CollectionDetailComponent :
 * les pages create/edit des objets n'en ont pas (voir les maquettes).
 */
@Component({
  imports: [MainMenuComponent, RouterOutlet],
  selector: 'app-main-layout-component',
  styleUrl: './main-layout-component.scss',
  templateUrl: './main-layout-component.html',
})
export class MainLayoutComponent implements OnInit {

  private authService = inject(AuthService);

  private collectionService = inject(CollectionService);

  ngOnInit(): void {
    // F5 : le token est restauré de localStorage mais currentUser est null
    // → on reprend l'utilisateur via GET /api/user (401 → interceptor).
    if (this.authService.token() && !this.authService.currentUser()) {
      this.authService.loadUser().subscribe();
    }

    this.collectionService.getCollections();
  }

}
