import { TestBed } from '@angular/core/testing';

import { GameCommandService } from './game-command.service';

describe('GameCommandService', () => {
  let service: GameCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
