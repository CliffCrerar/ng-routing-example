import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import * as marked from 'markdown-it';

@Component({
  selector: 'app-challenge',
  template: `
  <p></p>
  <button (click)="onViewChallengeClick()">View Challenge</button>
  <h2 *ngIf="fetching">Fetching. . . .</h2>
  <div [innerHTML]="challenge"></div>
  `,
  providers: [{ provide: 'MARKDOWN', useValue: marked }]
})
export class ChallengeComponent {
  fetching: boolean;
  markdown: any;
  challenge: string;
  constructor(@Inject('MARKDOWN') markedInjected: any) {
    this.fetching = false;
    this.markdown = markedInjected();
  }
  onViewChallengeClick(): void {
    this.fetching = true;
    environment.challenge().then(result => {
      this.challenge = this.markdown.render(result);
      this.fetching = false;
    }).catch(err => {
      this.challenge = err.message;
      this.fetching = false;
      console.log(err);
    });
  }

}
