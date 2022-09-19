import Entity from "../../entity/entity.abstract";

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
    if (this.id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is mandatory"
      })
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Name is mandatory"
      })
    }
    if (this._price <= 0) {
      this.notification.addError({
        context: "customer",
        message: "Price must be greater than zero"
      })
    }
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