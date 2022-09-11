import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";
import {productValid, invalidProduct } from "./product.test.utils"

describe("integration test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(new Product(productValid.id, productValid.name, productValid.price));
        const useCase = new FindProductUseCase(productRepository);

        const output = await useCase.execute({id:productValid.id});


        expect(output.id).toEqual(productValid.id);
        expect(output.name).toEqual(productValid.name);
        expect(output.price).toEqual(productValid.price);
    })

})