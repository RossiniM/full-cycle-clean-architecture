import Address from "../../../domain/customer/entity/adress";
import Customer from "../../../domain/customer/entity/customer";
import ListCustomerUsecase from "./list.customer.usecase";


const address = new Address("street maple bear", 123, "8344080", "Orsi");
const firstCostumer = new Customer("123", "Jhon", address);
const secondCostumer = new Customer("1234", "Jana", address);

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([firstCostumer, secondCostumer])),
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - list customer usecase", () => {

    it("should list a customer", async () => {
        const useCase = new ListCustomerUsecase(mockRepository());

        const output = await useCase.execute({});

        expect(output.data.length).toBe(2);
        expect(output.data[0].id).toBe(firstCostumer.id);
        expect(output.data[1].id).toBe(secondCostumer.id);
        expect(output.data[0].name).toBe(firstCostumer.name);
        expect(output.data[1].name).toBe(secondCostumer.name);
    });
});