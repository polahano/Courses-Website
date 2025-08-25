import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingContainerComponent } from './shopping-container.component';

describe('ShoppingContainerComponent', () => {
  let component: ShoppingContainerComponent;
  let fixture: ComponentFixture<ShoppingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
