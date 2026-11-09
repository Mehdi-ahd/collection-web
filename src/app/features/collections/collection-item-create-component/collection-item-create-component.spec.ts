import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionItemCreateComponent } from './collection-item-create-component';

describe('CollectionItemCreateComponent', () => {
  let component: CollectionItemCreateComponent;
  let fixture: ComponentFixture<CollectionItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionItemCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionItemCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
