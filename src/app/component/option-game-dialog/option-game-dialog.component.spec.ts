import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGameDialogComponent } from './option-game-dialog.component';

describe('OptionGameDialogComponent', () => {
  let component: OptionGameDialogComponent;
  let fixture: ComponentFixture<OptionGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionGameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
