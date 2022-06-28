import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosDiaComponent } from './turnos-dia.component';

describe('TurnosDiaComponent', () => {
  let component: TurnosDiaComponent;
  let fixture: ComponentFixture<TurnosDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
