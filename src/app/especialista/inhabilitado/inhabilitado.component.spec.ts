import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabilitadoComponent } from './inhabilitado.component';

describe('InhabilitadoComponent', () => {
  let component: InhabilitadoComponent;
  let fixture: ComponentFixture<InhabilitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhabilitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhabilitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
