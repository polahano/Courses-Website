import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNumbersComponent } from './home-numbers.component';

describe('HomeNumbersComponent', () => {
  let component: HomeNumbersComponent;
  let fixture: ComponentFixture<HomeNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
