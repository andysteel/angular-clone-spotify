import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtistaComponent } from './top-artista.component';

describe('TopArtistaComponent', () => {
  let component: TopArtistaComponent;
  let fixture: ComponentFixture<TopArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopArtistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
