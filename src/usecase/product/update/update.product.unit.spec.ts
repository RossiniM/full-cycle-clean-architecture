import UpdateProductUseCase from "./update.product.usecase";
import {firstProduct, productUpdateInput }from "./product.test.utils"

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(firstProduct),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - create product use case", () => {
    it("should create a product", async () => {
        const productRepository = mockRepository()
        const useCase = new UpdateProductUseCase(productRepository);
        const output = await useCase.execute(productUpdateInput);

        expect(output.id).toBe(productUpdateInput.id);
        expect(output.name).toBe(productUpdateInput.name);
        expect(output.price).toBe(productUpdateInput.price);
    });

    it("should not create a product", async () => {
        const productRepository = mockRepository()
        productRepository.find = jest.fn()
        const useCase = new UpdateProductUseCase(productRepository);
        expect( () => {
            return useCase.execute(productUpdateInput);
        }).rejects.toThrowError("Product not found")
    });
});