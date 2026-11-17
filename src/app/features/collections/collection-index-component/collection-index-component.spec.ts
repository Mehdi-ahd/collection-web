import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionIndexComponent } from './collection-index-component';

describe('CollectionIndexComponent', () => {
  let component: CollectionIndexComponent;
  let fixture: ComponentFixture<CollectionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionIndexComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
