import {app, sequelize} from '../express';
import  request from "supertest"

describe("E2E test for product", () =>{
    beforeEach( async () => {
        await sequelize.sync({force:true})
    })
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () =>{
        const response = await request(app)
            .post("/products")
            .send({
                id:"123",
                name:"banana",
                price:5000,
      })
        expect(response.status).toBe(200)
        expect(response.body.id).toBe("123")
        expect(response.body.name).toBe("banana")
        expect(response.body.price).toBe(5000)
    })
    it("should not create a product", async () =>{
        const response = await request(app)
            .post("/products")
            .send({
                id:"",
                name:"banana",
                price:-5000,
            })
        expect(response.status).toBe(500)
    })
    it("should list all customer", async () =>{
        const products = [{
            id:"123",
            name:"banana",
            price:100,
        },
            {
                id:"1234",
                name:"apple",
                price:50,
            }]
        await Promise.all(products.map(product => request(app).post("/products").send(product)))
        const response = await request(app).get("/products")

        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(2)
        expect(response.body.data[0].name).toBe("banana")
        expect(response.body.data[1].name).toBe("apple")
        expect(response.body.data[0].price).toBe(100)
        expect(response.body.data[1].price).toBe(50)
        expect(response.body.data[0].id).toBe("123")
        expect(response.body.data[1].id).toBe("1234")
    })
})