import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barnard59CliCommandComponent } from './barnard59-cli-command.component';

describe('Barnard59CliCommandComponent', () => {
  let component: Barnard59CliCommandComponent;
  let fixture: ComponentFixture<Barnard59CliCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barnard59CliCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Barnard59CliCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
