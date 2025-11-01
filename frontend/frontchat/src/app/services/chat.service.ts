import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private isBrowser: boolean;

  constructor(
    private socket: Socket,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public joinRoom(username: string, room: string) {
    if (!this.isBrowser) return; // só executa no browser
    this.socket.emit('joinRoom', { username, room });
  }

  public sendMessage(message: string) {
    if (!this.isBrowser) return; // só executa no browser
    this.socket.emit('message', message);
  }

  public listMessages(): Observable<any> {
    return new Observable((observer) => {
      if (!this.isBrowser) return; // só executa no browser
      this.socket.on('received', (msg: any) => {
        this.ngZone.run(() => {
          observer.next(msg);
        });
      });
    });
  }
}
