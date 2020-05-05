import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostsComponent } from './addcosts.component';

describe('AddcostsComponent', () => {
  let component: AddcostsComponent;
  let fixture: ComponentFixture<AddcostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
