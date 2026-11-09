import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemEditFormComponent } from './item-edit-form-component';

describe('ItemEditFormComponent', () => {
  let component: ItemEditFormComponent;
  let fixture: ComponentFixture<ItemEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemEditFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
