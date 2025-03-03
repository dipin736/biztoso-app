import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$;
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080'); 
    this.socket$.subscribe({
      next: (message: any) => {
        if (message && message.message && Array.isArray(message.message.data)) {
          const buffer = new Uint8Array(message.message.data);
          const text = new TextDecoder().decode(buffer);
          console.log('Decoded message:', text);
          this.messageSubject.next(text);
        } else {
          this.messageSubject.next(message.message);
        }
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      },
      complete: () => {
        console.log('WebSocket connection closed.');
      }
    });

    window.addEventListener('offline', this.cacheMessagesWhenOffline.bind(this));
    window.addEventListener('online', this.syncCachedMessages.bind(this));
  }

  sendMessage(message: string): void {
    console.log('Sending message:', message);
    if (navigator.onLine) {
      this.socket$.next({ message });
    } else {
      this.cacheMessageOffline(message);
    }
  }

   private cacheMessagesWhenOffline() {
    console.log('You are offline, messages will be cached locally.');
  }


  private cacheMessageOffline(message: string) {
    const cachedMessages = JSON.parse(localStorage.getItem('cachedMessages') || '[]');
    cachedMessages.push(message);
    localStorage.setItem('cachedMessages', JSON.stringify(cachedMessages));
  }

  // Sync cached messages when back online
  private syncCachedMessages() {
    console.log('Back online, syncing cached messages.');
    const cachedMessages = JSON.parse(localStorage.getItem('cachedMessages') || '[]');

    if (cachedMessages.length > 0) {
      cachedMessages.forEach((msg: string) => {
        console.log('Sending cached message:', msg);
        this.socket$.next({ message: msg });
      });

      localStorage.removeItem('cachedMessages');
    }
  }

  get messages$() {
    return this.messageSubject.asObservable();
  }


  closeConnection(): void {
    this.socket$.complete();
  }
}
