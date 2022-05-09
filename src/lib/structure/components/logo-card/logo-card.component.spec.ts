import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Demarches } from '../../models/enum/demarches.enum';
import { LogoCardComponent } from './logo-card.component';

describe('LogoCardComponent', () => {
  let component: LogoCardComponent;
  let fixture: ComponentFixture<LogoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return logo name with a string input', () => {
    const logoCaf = component.getName('accompagnantCaf');
    const logoCarsat = component.getName('carsat');
    const logoCpam = component.getName('cpam');
    expect(logoCaf).toEqual(Demarches.accompagnantCaf);
    expect(logoCarsat).toEqual(Demarches.carsat);
    expect(logoCpam).toEqual(Demarches.cpam);
  });
});
