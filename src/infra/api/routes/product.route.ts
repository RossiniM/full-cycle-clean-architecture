import express, {Request, Response} from 'express'
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router()

productRoute.post("/", async (req:Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try{
        const productDTO = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        }

        const output = await usecase.execute(productDTO);
        res.send(output).status(200);
    } catch (e) {
        res.status(500).send(e);
    }
})

productRoute.get("/", async (req:Request, res: Response) => {
    const usecase = new ListProductUsecase(new ProductRepository());
    try{

        const output = await usecase.execute({});
        res.send(output).status(200);
    } catch (e) {
        res.status(500).send(e);
    }
})