import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import {productValid, invalidProduct } from "./product.test.utils"

describe("integration test create product use case", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await useCase.execute(productValid);
        const produtCreated = await productRepository.find(productValid.id);

        expect(produtCreated.id).toEqual(productValid.id);
        expect(produtCreated.name).toEqual(productValid.name);
        expect(produtCreated.price).toEqual(productValid.price);
    })
})