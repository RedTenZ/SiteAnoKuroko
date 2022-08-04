import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/Message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private http: HttpClient) { }

  private stuff: Message[] = [];

  public stuff$ = new Subject<Message[]>();

  getMessage() {
    this.http.get('http://localhost:3000/api/ano').subscribe(
      (stuff: Message[]) => {
        if (stuff) {
          this.stuff = stuff;
          this.emitStuff();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitStuff() {
    this.stuff$.next(this.stuff);
  }

  createNewThingWithFile(message: Message, image: File) {
    return new Promise((resolve, reject) => {
      const messageData = new FormData();
      messageData.append('message', JSON.stringify(message));
      if(image != null){
      messageData.append('image', image, message.destinataire);
    }
      this.http.post('http://localhost:3000/api/ano', messageData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteThing(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/ano/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
