import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";
import {firstProduct, secondProduct } from "./product.test.utils"


describe("integration test list product use case", () => {
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
        await Promise.all([productRepository.create(firstProduct), productRepository.create(secondProduct)]);

        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});


        expect(output.data.length).toBe(2);
        expect(output.data[0].id).toBe("123");
        expect(output.data[1].id).toBe("1234");
        expect(output.data[0].name).toBe("product-1");
        expect(output.data[1].name).toBe("product-2");
        expect(output.data[0].price).toBe(50);
        expect(output.data[1].price).toBe(75);
    })

})