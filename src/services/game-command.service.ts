import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket-service.service';
import { GameService } from './game.service';
@Injectable({
  providedIn: 'root'
})
export class GameCommandService {


  constructor(private websocketService: WebsocketService, private gameService:GameService) { }

  moveUp(): void {
    this.sendMoveCommand(0);
  }

  moveDown(): void {
    this.sendMoveCommand(1);
  }

  moveLeft(): void {
    this.sendMoveCommand(2);
  }

  moveRight(): void {
    this.sendMoveCommand(3);
  }

  private sendMoveCommand(direction: number): void {
    this.websocketService.send({
      CommandType: 'Move',
      Data: {
        PlayerId: this.gameService.playerId,
        GameId:  this.gameService.gameId,
        Direction: direction
      }
    });
  }
}