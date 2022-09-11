import FindProductUseCase from "./find.product.usecase";
import {productValid, invalidProduct }from "./product.test.utils"

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(productValid),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - find product usecase", () => {

    it("should find a product", async () => {
        const useCase = new FindProductUseCase(mockRepository());
        const output = await useCase.execute({id:productValid.id});

        expect(output.id).toBe(productValid.id);
        expect(output.name).toBe(productValid.name);
        expect(output.price).toBe(productValid.price);
    });

    it("should not find a product", async () => {
        const productRepository = mockRepository()
        productRepository.find.mockImplementation(() => {throw new Error("Product not find")})

        const useCase = new FindProductUseCase(productRepository);

        expect(() => {
            return useCase.execute({id:productValid.id});
        }).rejects.toThrowError("Product not find")
    });
});