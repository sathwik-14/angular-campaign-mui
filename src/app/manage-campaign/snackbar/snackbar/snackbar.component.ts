import { Component,Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: "snack-bar-component-example-snack",
  template: `
    <span class="example-pizza-party">{{data}} </span>
  `,
  styles: [
    `
      .example-pizza-party {
        color: #fefefe;
      }
    `,
  ],
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

}
