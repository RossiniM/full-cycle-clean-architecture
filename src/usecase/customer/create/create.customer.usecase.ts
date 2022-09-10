import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {v4 as uuid} from "uuid";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class CreateCustomerUsecase {

    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customerID = uuid();
        // @ts-ignore
        const customer = new Customer(customerID, input.name, input.address)

        await this.customerRepository.create(customer);

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
