import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMusicaComponent } from './lista-musica.component';

describe('ListaMusicaComponent', () => {
  let component: ListaMusicaComponent;
  let fixture: ComponentFixture<ListaMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMusicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
