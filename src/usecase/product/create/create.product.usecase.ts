import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class  CreateProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(customerRepository: ProductRepositoryInterface) {
        this.productRepository = customerRepository;
    }

    async execute(input:InputCreateProductDTO): Promise<OutputCreateProductDTO>{
        const product = new Product(input.id, input.name, input.price);
        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}