import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUsecase {
    private productRepository: ProductRepositoryInterface;

    constructor(customerRepository: ProductRepositoryInterface) {
        this.productRepository = customerRepository;
    }

    async execute(input:InputFindProductDTO): Promise<OutputFindProductDTO>{
        const product = await this.productRepository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}