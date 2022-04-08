import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDireitoComponent } from './painel-direito.component';

describe('PainelDireitoComponent', () => {
  let component: PainelDireitoComponent;
  let fixture: ComponentFixture<PainelDireitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelDireitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelDireitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
