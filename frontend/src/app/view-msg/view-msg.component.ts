import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import { Message } from '../models/Message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-msg',
  templateUrl: './view-msg.component.html',
  styleUrls: ['./view-msg.component.scss']
})
export class ViewMsgComponent implements OnInit {

  public messages: Message[] = [];


  private messageSub: Subscription;

  constructor(private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.messageSub = this.messageService.stuff$.subscribe(
      (message) => {
        this.messages = message;
      }
    );
    this.messageService.getMessage();
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  deleteMsg(id){
    this.messageService.deleteThing(id);
    this.router.navigate(['/viewmsg']);
  }

}
