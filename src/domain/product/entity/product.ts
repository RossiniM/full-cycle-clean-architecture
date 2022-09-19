import Entity from "../../entity/entity.abstract";
import ProductValidatorFactory from "../factory/customer.validator.factory";

export default class Product  extends Entity{

  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  validate() {
    ProductValidatorFactory.create().validate(this)

    if(this.notification.hasErrors()){
      throw new Error(this.notification.messages())
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): Product {
    this._price = price;
    this.validate();
    return this;
  }
}