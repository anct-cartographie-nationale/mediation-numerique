import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LieuxMediationNumeriqueListComponent } from './lieux-mediation-numerique-list.component';

describe('lieux de mediation numerique list component', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LieuxMediationNumeriqueListComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('LieuxMediationNumeriqueListComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<LieuxMediationNumeriqueListComponent> = TestBed.createComponent(
      LieuxMediationNumeriqueListComponent
    );
    const structureListComponent: LieuxMediationNumeriqueListComponent = fixture.componentInstance;
    expect(structureListComponent).toBeTruthy();
  });
});
