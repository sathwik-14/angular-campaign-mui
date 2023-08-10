import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messages: string[] = [];
  errorOccurred = new EventEmitter<string>();


  /**
   * add a message to the messages array
   * @param {any} message:string
   */
  add(message: string) {
    this.messages.push(message);
  }

  handleHttpError(error: any) {
    const errorMessage = 'An error occurred. Please try again later.';
    this.errorOccurred.emit(errorMessage);
  }
  /**
   * clear all the messages
   *    */
  clear() {
    this.messages = [];
  }
}
