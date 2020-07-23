
interface IDataModel {
  id: string;
  inputOne: string;
  inputTwo: string;
}

export class DataModel implements IDataModel {
  public id: string = null;
  public inputOne: string;
  public inputTwo: string;

  constructor(routeParams: DataModel) {
    console.log('routeParams: ', routeParams);
    console.log(this);
    /**
     * The pattern below is called the reflection pattern, it is where an object uses iterates over its own
     * members to eitheer assign / retreive properties and can be
     */
    Object
      .keys(routeParams)
      .forEach(
        (property: string) => {
          console.log('property: ', property);
          this[this._propertyMapper(property)] = routeParams[property];
        }
      );
  }

  // tslint:disable-next-line:typedef
  /**
   * A mapper function that maps the attributes of an object
   * WHen using reflection it is best to provide properties the same
   * to not required a mapper.
   */
  // tslint:disable-next-line:typedef
  private _propertyMapper(property: string) {
    switch (property) {
      case 'id': return 'id';
      case 'input-one': return 'inputOne';
      case 'input-two': return 'inputTwo';
    }
  }
}
