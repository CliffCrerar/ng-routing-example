import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataModel } from './_model';
import { environment } from '../../environments/environment.prod';

type displayObject = { name: string, value: string };
type arrayObject = [string, string];

@Component({
  selector: 'app-comp-child-two',
  templateUrl: './comp-child-two.component.html',
  styleUrls: ['./comp-child-two.component.scss']
})
export class CompChildTwoComponent implements OnDestroy {

  private routeSubscription: Subscription;
  public goBackUrl: string[];
  public model: DataModel;

  constructor(
    // tslint:disable-next-line:variable-name
    private _activeRoute: ActivatedRoute
  ) {
    // Subscribing to the activated route injected at the constructor I am using the paramMap method that is an
    // event emitter (event emitters in angular are a type of observable) this emits a object that will have the
    // data passed into the route from the previous screen and used to populate the view after mutating the object
    // using the getValuesArray method.
    this.routeSubscription = this._activeRoute.paramMap
      .subscribe(
        (paramMap: any) => this.model = new DataModel(paramMap.params));
  }
  ngOnDestroy = (): void => this.routeSubscription.unsubscribe();
  /**
   * Another reflection pattern
   * In this function reflection is used to mutate the object from the data model structure into
   * and array of type displayObject
   */
  getValuesArray = (model: DataModel): displayObject[] => Object.entries(model).map(
    (keyPairArr: arrayObject): displayObject => ({ name: keyPairArr[0], value: keyPairArr[1] }))
  /**
   * Converting back to an array for routing
   */
  goBack(): void {
    // go back
  }


}
