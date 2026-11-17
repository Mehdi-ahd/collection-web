import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionItemEditComponent } from './collection-item-edit-component';

describe('CollectionItemEditComponent', () => {
  let component: CollectionItemEditComponent;
  let fixture: ComponentFixture<CollectionItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionItemEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionItemEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
