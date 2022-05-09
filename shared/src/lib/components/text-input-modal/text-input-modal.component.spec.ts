import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputModalComponent } from './text-input-modal.component';

describe('ModalConfirmationComponent', () => {
  let component: TextInputModalComponent;
  let fixture: ComponentFixture<TextInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
