import { LightningElement, wire } from "lwc";
import retrieveAccountRecords from "@salesforce/apex/AccountContactController.getAccounts";

export default class AccountComponent extends LightningElement {
  @wire(retrieveAccountRecords) accData;
  getAccId;
  button = false;
  handleChangeRadio(event) {
    this.getAccId = event.target.value;
    this.button = true;
  }

  showButton() {
    const myCustomEventItem = new CustomEvent("myeventdemo", {
      detail: this.getAccId
    });
    this.dispatchEvent(myCustomEventItem);
  }
}
