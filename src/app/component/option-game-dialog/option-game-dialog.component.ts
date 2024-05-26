import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../../services/game.service';
import { GameConnectService } from '../../../services/game-connect.service';
@Component({
  selector: 'app-my-dialog',
  standalone: true,
  styleUrls: ['./option-game-dialog.component.scss'],
  imports: [    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
  <h2 mat-dialog-title>Game Options</h2>
<mat-dialog-content class="mat-typography">
  <h3>Join a Game</h3>
  <p>Enter the game code below to join a game.</p>
  <mat-form-field class="full-width">
    <input matInput [(ngModel)]="gameCode" placeholder="Game Code">
  </mat-form-field>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="onJoin()">Join Game</button>
  <button mat-button (click)="onCreate()">Create Game</button>
</mat-dialog-actions>
  `,
})
export class OptionGameDialogComponent {
  gameCode: string = "";
  constructor(public dialogRef: MatDialogRef<OptionGameDialogComponent>, 
    private gameService:GameService,
    private gameConnectService: GameConnectService) {}

  onJoin(){
    this.gameService.joinGame(this.gameCode).subscribe({
      next: (response) => {
        this.gameConnectService.connect();
        this.dialogRef.close(OptionGameDialogComponent);
      },
      error: (error) => {
        console.log('Error joined game:', error);
      }
    });
 
  }

  onCreate() {
    this.gameService.createGame().subscribe({
      next: (response) => {
        this.gameConnectService.connect();
        this.dialogRef.close(OptionGameDialogComponent);
      },
      error: (error) => {
        console.log('Error creating game:', error);
      }
    });
}
}
