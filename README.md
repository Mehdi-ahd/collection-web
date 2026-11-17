# Collection Web

Frontend Angular du **Gestionnaire de Collection** : application de gestion de collections d'objets (pièces, figurines, timbres…), avec authentification par token et appels REST vers l'API Laravel.

> API backend associée : [collection-api](https://github.com/Mehdi-ahd/collection-api)

## Stack

| Élément | Choix |
| --- | --- |
| Framework | Angular 22 (standalone components, signals) |
| Formulaires | Reactive Forms |
| HTTP | `HttpClient` + intercepteur fonctionnel |
| Authentification | Token Sanctum (Bearer) persisté dans `localStorage` |
| Tests | Karma / Jasmine |

## Démarrage rapide

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

L'API doit tourner sur `http://localhost:8000` (voir collection-api).

Compte de démonstration (créé par le seeder de l'API) : `demo@collection.dev` / `password1234`.

## Fonctionnalités

- **Authentification** : inscription (validation + confirmation de mot de passe) → redirection vers login ; login → token + utilisateur stockés (signals + `localStorage`) ; logout avec révocation du token côté API.
- **Guards** : `authGuard` protège `/collection` et `/item` (présence du token) ; `guestGuard` empêche un utilisateur connecté d'accéder à `/login` et `/register`.
- **Session persistante** : après un F5, le token est restauré depuis `localStorage` et l'utilisateur est rechargé via `GET /api/user`.
- **Collections** : liste dans le menu latéral, sélection (menu ou URL), recherche filtrée, grille de cartes avec liseré selon la rareté (doré : Legendary, pointillé : Rare).
- **Objets de collection** : création et édition via un formulaire réactif partagé (upload d'image converti en base64), suppression en mode édition, compteur d'objets affichés.
- **Page 404** pour toute route inconnue.

## Structure

```
src/app/
├── core/
│   ├── guards/              # authGuard (token) , guestGuard (inverse)
│   ├── interceptors/        # authInterceptor : Bearer + 401 → clearSession + /login
│   └── services/            # AuthService (session, login/register/logout/loadUser)
├── features/
│   ├── auth/components/     # login, register
│   ├── collections/         # détail de collection + CollectionService
│   ├── items/               # create/edit objet + CollectionItemService
│   └── pages/               # not-found
├── layouts/                 # MainLayout (menu latéral + router-outlet)
├── shared/
│   ├── components/          # main-menu, search-bar, collection-item-card, item-edit-form
│   └── interfaces/          # contrats : ApiResponse, User, Collection, CollectionItem
└── app.routes.ts            # routes + guards
```

## Routes

| Chemin | Composant | Accès |
| --- | --- | --- |
| `/` | → redirection `/collection` | — |
| `/login` | `LoginComponent` | invité uniquement |
| `/register` | `RegisterComponent` | invité uniquement |
| `/collection` | `CollectionDetailComponent` (1ʳᵉ collection) | connecté |
| `/collection/:id` | `CollectionDetailComponent` | connecté |
| `/item/create` | `CollectionItemCreateComponent` | connecté |
| `/item/:id` | `CollectionItemEditComponent` | connecté |
| `**` | `NotFoundComponent` | — |

## Flux d'authentification

1. **Intercepteur** : chaque requête (hors `login`/`register`) reçoit `Authorization: Bearer <token>` ; un `401` déclenche `clearSession()` + redirection `/login`.
2. **Login** : le backend renvoie `{user, token}` → `setSession()` (signals + `localStorage`).
3. **Guard** : ne vérifie que la *présence* du token — la validité reste du ressort du backend (le `401` ci-dessus est le filet de sécurité).
4. **F5** : `MainLayout` appelle `loadUser()` si le token existe mais que l'utilisateur est null.

## Environnements

Deux fichiers d'environnement via `fileReplacements` (`angular.json`) :

| Fichier | Usage | `apiUrl` |
| --- | --- | --- |
| `environment.development.ts` | `ng serve` | `http://localhost:8000` |
| `environment.ts` | build de production | (à adapter au déploiement) |

## Tests

```bash
npx ng test       # suite complète
npm run build     # vérification du build (budgets de style inclus)
```
