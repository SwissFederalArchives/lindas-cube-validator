import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CubeDescriptionComponent } from './cube-description.component';

describe('CubeDescriptionComponent', () => {
  let component: CubeDescriptionComponent;
  let fixture: ComponentFixture<CubeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeDescriptionComponent, TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cube', undefined);
    fixture.componentRef.setInput('selectedProfile', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
