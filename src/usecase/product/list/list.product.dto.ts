// tslint:disable-next-line:no-empty-interface
export interface InputListProductDTO {}

type Product = {
    id: string;
    name: string;
    price: number;
}
export interface OutputListProductDTO {
  data: Product []
}