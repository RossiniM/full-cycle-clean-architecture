import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import {productUpdateInput, firstProduct } from "./product.test.utils"


describe("integration test - update product use case", () => {
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
        await productRepository.create(firstProduct);
        const useCase = new UpdateProductUseCase(productRepository);

        await useCase.execute(productUpdateInput);
        const productUpdate = await productRepository.find(productUpdateInput.id);

        expect(productUpdate.id).toEqual(productUpdateInput.id);
        expect(productUpdate.name).toEqual(productUpdateInput.name);
        expect(productUpdate.price).toEqual(productUpdateInput.price);
    })

})