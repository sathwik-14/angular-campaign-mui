import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messages: string[] = [];

  /**
   * add a message to the messages array
   * @param {any} message:string
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * clear all the messages
   *    */
  clear() {
    this.messages = [];
  }
}
