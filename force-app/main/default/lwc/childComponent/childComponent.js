import { LightningElement, api, wire } from "lwc";
import getContactList from "@salesforce/apex/AccountContactController.getContacts";

export default class ChildComponent extends LightningElement {
  @api accountid;
  records;
  errorMsg;
  getConId;
  @wire(getContactList, { accId: "$accountid" })
  wireConRecord({ error, data }) {
    if (data) {
      this.records = data;
      this.errorMsg = undefined;
    } else {
      this.errorMsg = error;
      this.records = undefined;
    }
  }

  radioButton(event) {
    this.getConId = event.target.value;
    const myCustomEventItem = new CustomEvent("demo", {
      detail: this.getConId
    });
    this.dispatchEvent(myCustomEventItem);
  }
}
