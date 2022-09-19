
import Product from "./product";

describe("Product unit tests", () => {

  it("should throw err when id is empty", () => {

    expect(() => {

      const product = new Product("", "Product 1", 100);

    }).toThrowError("product: Id is mandatory,");
  });

  it("should throw err when name is empty", () => {

    expect(() => {

      const product = new Product("1", "", 100);

    }).toThrowError("product: Name is mandatory,");
  });

  it("should throw err when name is empty and value is negative", () => {

    expect(() => {

      const product = new Product("1", "", -5);

    }).toThrowError("product: Name is mandatory,customer: Price must be greater than zero,");
  });

  it("should throw price when is invalid", () => {

    expect(() => {

      const product = new Product("1", "Product 1", - 100);

    }).toThrowError("customer: Price must be greater than zero,");
  });


  it("should change name ", () => {

    const product = new Product("1", "Product 1", 100);

    product.changeName("productName");

    expect(product.name).toBe("productName");

  });


  it("should change price to valid value ", () => {
    const product = new Product("1", "Product 1", 100);

    product.changePrice(200);

    expect(product.price).toBe(200);

  });


  it("should change price to invalid value ", () => {

    expect(() => {
      const product = new Product("1", "Product 1", 100);

      product.changePrice(-5);

    }).toThrowError("customer: Price must be greater than zero,");
  });

});
