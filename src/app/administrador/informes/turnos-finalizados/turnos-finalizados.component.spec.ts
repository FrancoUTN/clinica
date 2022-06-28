import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosFinalizadosComponent } from './turnos-finalizados.component';

describe('TurnosFinalizadosComponent', () => {
  let component: TurnosFinalizadosComponent;
  let fixture: ComponentFixture<TurnosFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosFinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
