const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('creates a new order in our database and sends a text message', async () => {

   const order = await Order.insert({ quantity: 10 });

    expect(order).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('gets all orders from our database', async () => {
      
      const orders = await Order
        .insert({ quantity: 1 });
      
       const result = await Order.getAll()
      
      expect(result).toEqual([orders]);
    });
  
  it('gets an order by id from our database', async () => {

    const order = await Order.insert({ quantity: 10 });
    
   const result = await Order.getOrderById(1)
    
      expect(result).toEqual(order);
  });
  
  it('updates an order selected by id in our database', async () => {
   
    Order.insert({ quantity: 10 });
    
    const updatedOrder = await Order.updateOrderById(20, 1);
    
    const result = await Order.getOrderById(1)

      expect(result).toEqual(updatedOrder);
  });
  
  it('deletes an order selected by id in our database', async () => {
   
    const result = await Order.insert({ quantity: 10 });

    await Order.insert({ quantity: 24 });
    await Order.deleteOrderById(2);
    
    const orderDB = await Order.getAll();

      expect(orderDB).toEqual([result]);
  });
});
