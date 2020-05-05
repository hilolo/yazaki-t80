import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsdataComponent } from './costsdata.component';

describe('CostsdataComponent', () => {
  let component: CostsdataComponent;
  let fixture: ComponentFixture<CostsdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostsdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
