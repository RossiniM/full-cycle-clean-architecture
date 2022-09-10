import { number } from "yargs";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {

        const customer = await this.customerRepository.find(input.id);
        if (!customer || customer == undefined) {
            throw new Error(`Customer not find ${customer.id}`)
        }

        customer.changeName(input.name);
        // @ts-ignore
        customer.changeAddress(input.address)
        await this.customerRepository.update(customer)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }

    }
}