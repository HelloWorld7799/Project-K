import { LightningElement, wire } from "lwc";
import retrieveContactRecords from "@salesforce/apex/AccountContactController.getContacts";
import { publish, MessageContext } from "lightning/messageService";
import SimpleChannel from "@salesforce/messageChannel/SimpleChannel__c";

export default class ContactComponent extends LightningElement {
  accountId;
  records;
  errorMsg;
  openModal = false;
  removeButton = false;
  conId = "";
  @wire(MessageContext) messageContext;

  @wire(retrieveContactRecords, { accId: "$accountId" })
  wireConRecord({ error, data }) {
    if (data) {
      this.records = data;
      this.errorMsg = undefined;
    } else {
      this.errorMsg = error;
      this.records = undefined;
    }
  }

  handleChangeAction(event) {
    this.accountId = event.detail;
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
    this.removeButton = false;
  }

  radioButton(event) {
    this.removeButton = true;
    this.conId = event.target.value;
    console.log(event.target.value);
  }
  removeAccount() {
    const payload = { data: this.conId };
    publish(this.messageContext, SimpleChannel, payload);
    this.openModal = false;
  }
}
