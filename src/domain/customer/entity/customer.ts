import Address from "./adress"
import Entity from "../../entity/entity.abstract";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity{

  private _name: string;
  private _address: Address;
  private _rewardPoints: number = 0;
  private _active: boolean = true;

  constructor(id: string, name: string, address: Address) {
    super();
    this._id = id;
    this._address = address;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address{
    return this._address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)

    if(this.notification.hasErrors()){
      throw new Error(this.notification.messages())
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validate();
  }


  activate() {
    this._active = true;
  }

  isActive(): boolean {
    return this._active;
  }

  inactivate() {
    this._active = false;
  }

}
/*

Complexidade de negócio

Domain
- Entity
 -- Customer.ts(Regra de negócio)


 Complexidade acidental

 infra - Mundo externo
- Entity/Model
 -- customer.ts(get,set)
*/