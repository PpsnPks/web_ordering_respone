import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebOrderingBarComponent } from './web-ordering-bar.component';

describe('WebOrderingBarComponent', () => {
  let component: WebOrderingBarComponent;
  let fixture: ComponentFixture<WebOrderingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebOrderingBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebOrderingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
