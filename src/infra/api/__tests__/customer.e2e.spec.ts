import {app, sequelize} from '../express';
import  request from "supertest"

describe("E2E test for customer", () =>{
    beforeEach( async () => {
        await sequelize.sync({force:true})
    })
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () =>{
        const response = await request(app)
            .post("/customers")
            .send({
                name:"Jhon",
                address:{
                    street: "Street",
                    city: "City",
                    number:123,
                    zip: "232332"

            }})
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Jhon")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.city).toBe("City")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe( "232332")
    })
    it("should not create a customer", async () =>{
        const response = await request(app)
            .post("/customers")
            .send({
                name:"",
                address:{
                    street: "Street",
                    city: "City",
                    number:123,
                    zip: "232332"

                }})
        expect(response.status).toBe(500)
    })
    it("should list all customer", async () =>{
        const customerAddress= {street: "Street", city: "City", number:123, zip: "232332"}
        const customers = [{name:"Jhon", address:customerAddress},{name: "Mary", address: customerAddress}]
        await Promise.all(customers.map(customer => request(app).post("/customers").send(customer)))
        const response = await request(app).get("/customers")

        expect(response.status).toBe(200)
        expect(response.body.data[0].name).toBe("Jhon")
        expect(response.body.data.length).toBe(2)
        expect(response.body.data[1].name).toBe("Mary")
        expect(response.body.data[0].address.street).toBe("Street")
        expect(response.body.data[0].address.city).toBe("City")
        expect(response.body.data[0].address.number).toBe(123)
        expect(response.body.data[0].address.zip).toBe( "232332")
    })
})