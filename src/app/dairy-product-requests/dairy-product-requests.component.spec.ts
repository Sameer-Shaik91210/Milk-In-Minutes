import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyProductRequestsComponent } from './dairy-product-requests.component';

describe('DairyProductRequestsComponent', () => {
  let component: DairyProductRequestsComponent;
  let fixture: ComponentFixture<DairyProductRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DairyProductRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DairyProductRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
