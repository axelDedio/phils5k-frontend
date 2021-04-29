import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WattPlotComponent } from './watt-plot.component';

describe('WattPlotComponent', () => {
  let component: WattPlotComponent;
  let fixture: ComponentFixture<WattPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WattPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WattPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
