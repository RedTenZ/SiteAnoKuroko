import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Message } from '../models/Message.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-send-msg',
  templateUrl: './send-msg.component.html',
  styleUrls: ['./send-msg.component.scss']
})
export class SendMsgComponent implements OnInit {

  public messageForm: FormGroup;
  public loading = false;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = false;
    this.messageForm = this.formBuilder.group({
      destinataire: [null, Validators.required],
      message: [null, Validators.required],
      image: [null, Validators.required, mimeType]
    });
  }

  onSubmit() {
    const msg = new Message();
    msg.destinataire = this.messageForm.get('destinataire').value;
    msg.message = this.messageForm.get('message').value;
    msg.imageUrl = '';

    this.messageService.createNewThingWithFile(msg, this.messageForm.get('image').value).then(
      () => {
        this.messageForm.reset();
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.messageForm.get('image').patchValue(file);
    this.messageForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.messageForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
