import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeUsuarioComponent } from './rodape-usuario.component';

describe('RodapeUsuarioComponent', () => {
  let component: RodapeUsuarioComponent;
  let fixture: ComponentFixture<RodapeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RodapeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RodapeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
