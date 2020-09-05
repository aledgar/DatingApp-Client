import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from '../../../services/messages.service';
import {AlertifyService} from '../../../services/alertify.service';
import {Message} from '../../../models/message';
import {AuthService} from '../../../services/auth.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-messages-thread',
  templateUrl: './messages-thread.component.html',
  styleUrls: ['./messages-thread.component.css']
})
export class MessagesThreadComponent implements OnInit {

  @Input() recipientId;
  messages: Message[];
  newMessage: any = {
    content: ''
  };

  constructor(private messagesService: MessagesService,
              private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.messagesService.getMessageThread(this.recipientId)
      .pipe(
        tap(messages => {
          messages.forEach((message, index) => {
            if (message.isRead === false && message.recipientId !== this.messagesService.userId) {
              this.messagesService.markAsRead(message.id);
            }
          });
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => this.alertify.error(error));
  }

  sendMessage(): void {

    this.newMessage.senderId = this.messagesService.userId;
    this.newMessage.recipientId = this.recipientId;

    this.messagesService.sendMessage(this.newMessage)
      .subscribe(message => {
        console.log(message);
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => this.alertify.error(error));
  }
}
