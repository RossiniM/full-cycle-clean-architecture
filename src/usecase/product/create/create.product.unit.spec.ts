import CreateProductUseCase from "./create.product.usecase";
import {productValid, invalidProduct }from "./product.test.utils"

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - create product usecase", () => {

    it("should create a product", async () => {
        const productRepository = mockRepository()
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(productValid);

        expect(output.id).toBe(productValid.id);
        expect(output.name).toBe(productValid.name);
        expect(output.price).toBe(productValid.price);
    });

    it("should not create a product", async () => {
        const productRepository = mockRepository()
        const useCase = new CreateProductUseCase(productRepository);
        expect( () => {
            return useCase.execute(invalidProduct);
        }).rejects.toThrowError("Price is invalid")
    });
});