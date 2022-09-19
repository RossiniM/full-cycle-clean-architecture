import Customer from "./customer";
import Address from "./adress";

describe("Customer unit tests", () => {

  it("should throw err when id is empty", () => {

    expect(() => {

      const address = new Address("camp noua", 78232, "4545", "CityHall");
      const customer = new Customer("", "Jhon", address);

    }).toThrowError("customer: Id is mandatory,");
  });



  it("should throw err when name is empty", () => {

    expect(() => {
      // 3 A(Arrange, Act, Assert)
      const address = new Address("camp noua", 78232, "4545", "CityHall");
      const customer = new Customer("1", "", address);

    }).toThrowError("customer: Name is mandatory,");
  });


  it("should throw err when change name to empty value", () => {

    expect(() => {

      const address = new Address("camp noua", 78232, "4545", "CityHall");
      const customer = new Customer("1", "Jhon", address);
      customer.changeName("")

    }).toThrowError("customer: Name is mandatory,");
  });

  it("should change name", () => {

    // Arrange
    const address = new Address("camp noua", 78232, "4545", "CityHall");
    const customer = new Customer("1", "Jhon", address);

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane")
  });


  it("should toggle", () => {
    const address = new Address("camp noua", 78232, "4545", "CityHall");
    const customer = new Customer("1", "Jhon", address);

    customer.inactivate();

    expect(customer.isActive()).toBe(false);

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should add reward points", () => {
    const address = new Address("camp noua", 78232, "4545", "CityHall");
    const customer = new Customer("1", "Jhon", address);
    expect(customer.rewardPoints).toBe(0);


    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

})