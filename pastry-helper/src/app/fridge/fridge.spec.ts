import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fridge } from './fridge';

describe('Fridge', () => {
  let component: Fridge;
  let fixture: ComponentFixture<Fridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fridge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
