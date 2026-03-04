import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDialog } from './fridge-dialog';

describe('FridgeDialog', () => {
  let component: FridgeDialog;
  let fixture: ComponentFixture<FridgeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
