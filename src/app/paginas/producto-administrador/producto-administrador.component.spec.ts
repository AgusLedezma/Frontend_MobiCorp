import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAdministradorComponent } from './producto-administrador.component';

describe('ProductoAdministradorComponent', () => {
  let component: ProductoAdministradorComponent;
  let fixture: ComponentFixture<ProductoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
