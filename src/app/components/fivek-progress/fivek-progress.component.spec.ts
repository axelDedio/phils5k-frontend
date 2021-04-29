import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivekProgressComponent } from './fivek-progress.component';

describe('FivekProgressComponent', () => {
  let component: FivekProgressComponent;
  let fixture: ComponentFixture<FivekProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivekProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FivekProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
