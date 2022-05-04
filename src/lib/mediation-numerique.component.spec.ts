import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationNumeriqueComponent } from './mediation-numerique.component';

describe('MediationNumeriqueComponent', () => {
  let component: MediationNumeriqueComponent;
  let fixture: ComponentFixture<MediationNumeriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediationNumeriqueComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediationNumeriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
