import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUsecase {
    private productRepository: ProductRepositoryInterface;
    constructor(customerRepository: ProductRepositoryInterface) {
        this.productRepository = customerRepository;
    }


    async execute(input:InputUpdateProductDTO): Promise<OutputUpdateProductDTO>{
        const product = await this.productRepository.find(input.id);
        if(!product)
            throw new Error("Product not found");
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}