import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// type Href = [object[] | string];

@Component({
  selector: 'app-comp-child-one',
  templateUrl: './comp-child-one.component.html',
  styleUrls: ['./comp-child-one.component.scss']
})
export class CompChildOneComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;

  public inputOneInvalid: boolean;
  public inputTwoInvalid: boolean;

  public routeTo: any[];
  public id: number;

  @ViewChild('form', { static: true }) form: NgForm;

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.inputOneInvalid = false;
    this.inputTwoInvalid = false;
  }

  ngOnInit(): void {
    this.routeSubscription = this.form.valueChanges.subscribe(
      () => this.routeTo = ['/', 'child-two', this.id, this.form.value]);

    this.id = this._generateId();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  /**
   * Generate random 4 digit integer
   */
  private _generateId(): number {
    const { floor, random } = Math;
    return floor(random() * 10000);
  }

  onSubmit(): void {
    this.validationCheck()
      .then(() => this._router.navigate(this.routeTo))
      .catch(() => console.log('invalid'));
  }

  validationCheck(): Promise<boolean> {

    const { ['input-one']: inputOne, ['input-two']: inputTwo } = this.form.controls;
    /**
     * The line above is the same as the following:
     * const inputOne = this.form.controls['input-one'].value
     * const inputTwo = this.form.controls['input-two'].value
     *
     * it is unique to ES6 JS and TS and called destructuring with re-assignment.
     * if you knew this already please forgive my ignorance.
     */

    this.inputOneInvalid = inputOne.invalid;
    this.inputTwoInvalid = inputTwo.invalid;

    return new Promise<boolean>((resolve: any, reject: any) => {

      if (!this.inputOneInvalid && !this.inputTwoInvalid) {
        return resolve(true); // resolve promise - fire then method
      } else {
        return reject(false); // reject promise - fire catch method
      }

    });
  }

}
