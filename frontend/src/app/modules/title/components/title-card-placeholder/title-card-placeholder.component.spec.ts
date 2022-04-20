import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCardPlaceholderComponent } from './title-card-placeholder.component';

describe(`TitleCardPlaceholderComponent`, () => {
  let component: TitleCardPlaceholderComponent;
  let fixture: ComponentFixture<TitleCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleCardPlaceholderComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
