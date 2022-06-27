import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavbuttonUsuariosComponent } from './favbutton-usuarios.component';

describe('FavbuttonUsuariosComponent', () => {
  let component: FavbuttonUsuariosComponent;
  let fixture: ComponentFixture<FavbuttonUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavbuttonUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavbuttonUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
