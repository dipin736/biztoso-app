import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MatInputModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  newMessage: string = '';
  private messageSubscription: Subscription = new Subscription();

  constructor(
    private websocketService: WebsocketService,
    private cdRef: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.messageSubscription = this.websocketService.messages$.subscribe((message: string) => {
      this.messages.push(message); 
      this.cdRef.markForCheck();
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.websocketService.sendMessage(this.newMessage); 
      this.messages.push(this.newMessage); 
      this.newMessage = ''; 
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe(); 
    this.websocketService.closeConnection(); 
  }
}