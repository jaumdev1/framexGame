import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:5036';
  public gameId: string = '';
  public playerId: string = '';

  constructor(private http: HttpClient) { }

  createGame(): Observable<any> {
    var game  = this.http.post<any>(`${this.baseUrl}/createGame`, {}).pipe(
      tap(response => {
        this.gameId = response.gameId;
        this.playerId = response.playerId;
      }),
      catchError(error => {
        console.log('Error occurred:', error);
        return throwError(() => error);
      })
    );
   
    return game;
  }
  startGame(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/startGame`, { GameId: this.gameId });
  }

  joinGame(gameId:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/joinGame`, { GameId: gameId }).pipe(
      tap(response => {
        console.log(response);
        this.gameId = gameId;
        this.playerId = response.playerId;
      })
    );
  }
}