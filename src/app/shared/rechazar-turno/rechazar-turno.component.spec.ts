import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarTurnoComponent } from './rechazar-turno.component';

describe('RechazarTurnoComponent', () => {
  let component: RechazarTurnoComponent;
  let fixture: ComponentFixture<RechazarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
