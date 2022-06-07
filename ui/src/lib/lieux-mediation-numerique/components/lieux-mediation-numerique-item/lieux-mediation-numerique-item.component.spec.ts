import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LieuxMediationNumeriqueItemComponent } from './lieux-mediation-numerique-item.component';

describe('lieux de mediation numerique item component', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueItemComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueItemComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueItemComponent> = TestBed.createComponent(
      LieuxMediationNumeriqueItemComponent
    );
    const cardComponent: LieuxMediationNumeriqueItemComponent = fixture.componentInstance;
    expect(cardComponent).toBeTruthy();
  });
});
