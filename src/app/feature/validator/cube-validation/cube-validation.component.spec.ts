import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CubeValidationComponent } from './cube-validation.component';

describe('CubeValidationComponent', () => {
  let component: CubeValidationComponent;
  let fixture: ComponentFixture<CubeValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeValidationComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeValidationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('report', undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
