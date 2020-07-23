import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompMainComponent } from './comp-main/comp-main.component';
import { CompChildOneComponent } from './comp-child-one/comp-child-one.component';
import { CompChildTwoComponent } from './comp-child-two/comp-child-two.component';
import { ChallengeComponent } from './_/challenge.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CompMainComponent,
    CompChildOneComponent,
    CompChildTwoComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/child-one/no-id', pathMatch: 'full' },
      { path: 'child-one/:id', component: CompChildOneComponent },
      { path: 'child-two/:id', component: CompChildTwoComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



