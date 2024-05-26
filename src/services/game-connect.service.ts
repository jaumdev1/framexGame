import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket-service.service';
import { GameService } from './game.service';
@Injectable({
  providedIn: 'root'
})
export class GameConnectService {
  constructor(private websocketService: WebsocketService, private gameService: GameService) { }
  connect(): void {
    this.connectCommand();
  }
  private connectCommand(): void {
    this.websocketService.send({
      CommandType: 'Connect',
      Data: {
        PlayerId: this.gameService.playerId,
        GameId: this.gameService.gameId,
      }
    });
  }
  
}
