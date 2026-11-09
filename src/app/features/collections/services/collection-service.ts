import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth-service';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { Collection } from '../../../shared/interfaces/Collection';

@Service()
export class CollectionService {
  authService = inject(AuthService);
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  user = this.authService.currentUser();

  index(): Observable<ApiResponse<Collection[]>> {
    return this.http.get<ApiResponse<Collection[]>>(`${this.apiUrl}/collection`);
  }
}
