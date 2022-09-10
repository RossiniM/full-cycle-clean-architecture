import CreateCustomerUsecase from "./create.customer.usecase";


const input = {
    name: "Jhon",
    address: {
        street: "street maple bear",
        number: 123,
        zip: "8344080",
        city: "Orsi"
    }
}

const inputInvalid = {
    name: "",
    address: {
        street: "street maple bear",
        number: 123,
        zip: "8344080",
        city: "Orsi"
    }}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test - create customer usecase", () => {

    it("should create a customer", async () => {
        const customerRepository = mockRepository()
        const useCase = new CreateCustomerUsecase(customerRepository);

        const expectedOutput = {
            id: expect.any(String),
            name: "Jhon",
            address: {
                street: "street maple bear",
                number: 123,
                zip: "8344080",
                city: "Orsi"
            }
        }

        const output = await useCase.execute(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should not create a customer", async () => {
        const customerRepository = mockRepository()
        const useCase = new CreateCustomerUsecase(customerRepository);

        expect( () => {
          return useCase.execute(inputInvalid);
        }).rejects.toThrowError("Name is required")
    });
});