import { Component } from '@angular/core';
import { MainMenuComponent } from '../../shared/components/main-menu-component/main-menu-component';
import { SearchBarComponent } from '../../shared/components/search-bar-component/search-bar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [MainMenuComponent, SearchBarComponent, RouterOutlet],
  selector: 'app-main-layout-component',
  styleUrl: './main-layout-component.scss',
  templateUrl: './main-layout-component.html',
})
export class MainLayoutComponent {}
