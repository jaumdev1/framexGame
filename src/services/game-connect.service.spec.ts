import { TestBed } from '@angular/core/testing';

import { GameConnectService } from './game-connect.service';

describe('GameConnectService', () => {
  let service: GameConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
