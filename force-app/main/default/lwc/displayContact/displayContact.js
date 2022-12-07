import { LightningElement, wire } from "lwc";
import {
  subscribe,
  unsubscribe,
  MessageContext
} from "lightning/messageService";

import updateContact from "@salesforce/apex/AccountContactController.updateContact";

import SimpleChannel from "@salesforce/messageChannel/SimpleChannel__c";
export default class DisplayContact extends LightningElement {
  subscription = null;
  strCapturedText;
  contacts;

  @wire(MessageContext) messageContext;

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        SimpleChannel,
        (message) => this.setCaptureText(message)
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  // This method will run once the component is removed from DOM.
  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

  // This method will update the value once event is captured.
  setCaptureText(message) {
    this.strCapturedText = message.data;
    updateContact({ contactId: this.strCapturedText })
      .then((result) => {
        this.contacts = result;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
