import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUsecase {
    private productRepository: ProductRepositoryInterface;

    constructor(customerRepository: ProductRepositoryInterface) {
        this.productRepository = customerRepository;
    }

    async execute(input:InputListProductDTO): Promise<OutputListProductDTO>{
        const productList = await this.productRepository.findAll();

        return  {
            data: productList.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }})
        }
    }
}
