import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiesComponent } from './noticies-component';

describe('NoticiesComponent', () => {
  let component: NoticiesComponent;
  let fixture: ComponentFixture<NoticiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
