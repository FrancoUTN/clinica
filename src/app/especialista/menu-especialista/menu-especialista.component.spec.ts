import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEspecialistaComponent } from './menu-especialista.component';

describe('MenuEspecialistaComponent', () => {
  let component: MenuEspecialistaComponent;
  let fixture: ComponentFixture<MenuEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
