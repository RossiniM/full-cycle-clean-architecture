import ListProductUseCase from "./list.product.usecase";
import {firstProduct, secondProduct }from "./product.test.utils"

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([firstProduct, secondProduct]),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - list product usecase", () => {

    it("should list a product", async () => {
        const useCase = new ListProductUseCase(mockRepository());
        const output = await useCase.execute({});

        expect(output.data.length).toBe(2);
        expect(output.data[0].id).toBe("123");
        expect(output.data[1].id).toBe("1234");
        expect(output.data[0].name).toBe("product-1");
        expect(output.data[1].name).toBe("product-2");
        expect(output.data[0].price).toBe(50);
        expect(output.data[1].price).toBe(75);
    });

});