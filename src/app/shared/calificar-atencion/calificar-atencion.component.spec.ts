import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarAtencionComponent } from './calificar-atencion.component';

describe('CalificarAtencionComponent', () => {
  let component: CalificarAtencionComponent;
  let fixture: ComponentFixture<CalificarAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificarAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
