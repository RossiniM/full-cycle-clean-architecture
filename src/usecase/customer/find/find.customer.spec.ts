import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/adress";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer-repository";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address("street maple bear", 123, "8344080", "Orsi");
const costumer = new Customer("123", "Jhon", address);

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(costumer),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find customer usecase", () => {

    it("should find a customer", async () => {
        const customerRepository = mockRepository()
        const useCase = new FindCustomerUseCase(customerRepository);

        const expectedOutput = {
            id: "123",
            name: "Jhon",
            address: {
                street: "street maple bear",
                number: 123,
                zip: "8344080",
                city: "Orsi"
            }
        }

        const input = { id: "123" };
        const output = await useCase.execute(input);
        expect(output).toEqual(expectedOutput);
    });
    it("should not find a customer", async () => {
        const customerRepository = mockRepository()
        customerRepository.find.mockImplementation(() => {throw new Error("Customer not found")});
        const useCase = new FindCustomerUseCase(customerRepository);


        const input = { id: "123" };
        const output =
        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrowError("Customer not found")
    })


})