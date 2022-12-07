import { LightningElement, api } from "lwc";

export default class ParentComponent extends LightningElement {
  @api recordId;
  conId;

  handleChild(event) {
    this.conId = event.detail;
  }
}
