import { Component } from "@angular/core";

@Component({
  selector: 'loading-component',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinner {}