import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAtencionesComponent } from './mis-atenciones.component';

describe('MisAtencionesComponent', () => {
  let component: MisAtencionesComponent;
  let fixture: ComponentFixture<MisAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
