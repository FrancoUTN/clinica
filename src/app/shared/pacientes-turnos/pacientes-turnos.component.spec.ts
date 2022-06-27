import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesTurnosComponent } from './pacientes-turnos.component';

describe('PacientesTurnosComponent', () => {
  let component: PacientesTurnosComponent;
  let fixture: ComponentFixture<PacientesTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
