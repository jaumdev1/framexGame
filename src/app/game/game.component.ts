import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as Phaser from 'phaser';
import { OptionGameDialogComponent } from '../component/option-game-dialog/option-game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from '../../services/websocket-service.service';
import { GameService } from '../../services/game.service';
import { GameCommandService } from '../../services/game-command.service';

export interface Player {
  Id: string;
  X: number;
  Y: number;
  MoveDirection: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class GameComponent implements OnInit {
  private game!: Phaser.Game;
  static squareSpeed: number = 500;  // Aumente este valor para aumentar a velocidade
  static squareSize: number = 32;
  private players: Phaser.Physics.Arcade.Image[] = [];
  private playersPosition: Player[] = [];

  public showStartButton: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    public dialog: MatDialog, 
    private webSocketService: WebsocketService,
    private gameService: GameService,
    private gameCommandService: GameCommandService
  ) {
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGame();
    }
    this.dialog.open(OptionGameDialogComponent);
    this.webSocketService.getMessages().subscribe(message => {
      console.log('Message received fora:', message);
      if (JSON.parse(message).GameState === 'StateGame') {
        console.log('Message received StateGame:', message);
        let players = JSON.parse(message).Players;
        this.updatePlayers(players);
      }
    });
  }

  updatePlayers(players: Player[]): void {
    players.forEach((player, index) => {
      if (this.players[index]) {
        this.playersPosition[index] = player;  // Atualiza a posição do player
      } else {
        // Criar novos jogadores se necessário
        const scene = this.game.scene.scenes[0] as Phaser.Scene;
        const newPlayer = scene.physics.add.image(player.X, player.Y, 'player');
        newPlayer.setDisplaySize(GameComponent.squareSize, GameComponent.squareSize);
        newPlayer.setCollideWorldBounds(true);
        this.players.push(newPlayer);
        this.playersPosition.push(player);
      }
    });
  }

  initializeGame(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'gameContainer',
      width: 800,
      height: 800,
      fps: {
        target: 128,  
      },
      physics: {
        default: 'arcade',
      },
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      }
    };

    this.game = new Phaser.Game(config);

    // window.addEventListener('resize', () => {
    //   this.game.scale.resize(window.innerWidth, window.innerHeight);
    // });
  }

  preload(): void {
    // Carregue seus assets aqui
  }

  create(): void {
    // Não criar jogador aqui, eles serão criados em updatePlayers
  }

  update(time: number, delta: number): void {
    this.players.forEach((player, index) => {
      const playerPos = this.playersPosition[index];
      let velocity = new Phaser.Math.Vector2(0, 0);

      switch (playerPos.MoveDirection) {
        case 0: // up
          velocity.y = -GameComponent.squareSpeed;
          break;
        case 1: // down
          velocity.y = GameComponent.squareSpeed;
          break;
        case 2: // left
          velocity.x = -GameComponent.squareSpeed;
          break;
        case 3: // right
          velocity.x = GameComponent.squareSpeed;
          break;
      }

      if (player.body instanceof Phaser.Physics.Arcade.Body) {
        player.body.setVelocity(velocity.x, velocity.y);
      }
    });
  }

  startGame(): void {
    this.showStartButton = false;
    this.gameService.startGame().subscribe({
      next: (response) => {},
      error: (error) => {
        console.log('Error creating game:', error);
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.gameCommandService.moveUp();
        break;
      case 'ArrowDown':
        this.gameCommandService.moveDown();
        break;
      case 'ArrowLeft':
        this.gameCommandService.moveLeft();
        break;
      case 'ArrowRight':
        this.gameCommandService.moveRight();
        break;
      default:
        break;
    }
  }
}
