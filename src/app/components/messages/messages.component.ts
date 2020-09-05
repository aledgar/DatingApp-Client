import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../services/alertify.service';
import {Message} from '../../models/message';
import {PaginatedResult, Pagination} from '../../models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private router: ActivatedRoute,
              private messageService: MessagesService,
              private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    }, error => this.alertify.error(error));
  }

  loadMessages(): void {
    this.messageService.getMessages(this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe(data => {
        this.messages = data.result;
        this.pagination = data.pagination;
      }, error => this.alertify.error(error));
  }

  pageChanged($event) {

  }
}
