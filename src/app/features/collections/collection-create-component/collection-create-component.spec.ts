import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionCreateComponent } from './collection-create-component';

describe('CollectionCreateComponent', () => {
  let component: CollectionCreateComponent;
  let fixture: ComponentFixture<CollectionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
