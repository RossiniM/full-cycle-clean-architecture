import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/adress";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer-repository";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";


describe("integration test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);
        const address = new Address("street maple bear", 123, "8344080", "Orsi");
        const costumer = new Customer("123", "Jhon", address);

        await customerRepository.create(costumer);

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
    })

})