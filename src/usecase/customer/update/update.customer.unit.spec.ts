import Address from "../../../domain/customer/entity/adress";
import Customer from "../../../domain/customer/entity/customer";
import UpdateCustomerUsecase from "./update.customer.usecase";


const address = new Address("street maple bear", 123, "8344080", "Orsi");
const costumer = new Customer("123", "Jhon", address);

const input = {
    id: "123",
    name: "Jhon Updated",
    address: {
        street: "street updated",
        number: 1234,
        zip: "zip update",
        city: "city update"
    }
}
const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(costumer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - update customer usecase", () => {

    it("should create a customer", async () => {
        const customerRepository = mockRepository()
        const useCase = new UpdateCustomerUsecase(customerRepository);

        const expectedOutput = {
            id: "123",
            name: "Jhon Updated",
            address: {
                street: "street updated",
                number: 1234,
                zip: "zip update",
                city: "city update"
            }
        }

        const output = await useCase.execute(input);
        expect(output).toEqual(expectedOutput);
    });
});