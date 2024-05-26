import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  private messages: Subject<any>;

  constructor() {
    this.socket = new WebSocket('ws://localhost:5036/ws');
    this.messages = new Subject();

    this.socket.onmessage = (message) => {
      let data;
      try {
        data = message.data;
      } catch (error) {
        console.error('Error parsing message data:', error);
        return;
      }

      this.messages.next(data);
    };
  }
  public send(data: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      console.log('Sending data:', data);
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('Cannot send data, WebSocket is not open');
    }
  }

  public getMessages(): Observable<any> {
    return this.messages.asObservable();
  }
}