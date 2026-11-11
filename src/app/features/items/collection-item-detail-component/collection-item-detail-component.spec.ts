import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionItemDetailComponent } from './collection-item-detail-component';

describe('CollectionItemDetailComponent', () => {
  let component: CollectionItemDetailComponent;
  let fixture: ComponentFixture<CollectionItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionItemDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionItemDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
