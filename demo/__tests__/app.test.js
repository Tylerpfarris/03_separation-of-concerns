const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
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

    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('gets all orders from our database', async () => {
      
      const orders = await Order
        .insert({ quantity: 1 });
      
      const res = await request(app)
        .get('/api/v1/orders');
      
      expect(res.body).toEqual([orders]);
    });
  
  it('gets an order by id from our database', async () => {

    const order = await Order
      .insert({ quantity: 10 });
    
    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);
    
      expect(res.body).toEqual(order);
  });
  
  it('updates an order selected by id in our database', async () => {
   
    const order = await Order
      .insert({ quantity: 10 });
    
    const updatedOrder = await Order
      .updateOrderById(20, order.id);
    
    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);
    
      expect(res.body).toEqual(updatedOrder);
  });
  
  it('deletes an order selected by id in our database', async () => {
   
   const result =  await Order.insert({ quantity: 10 });
    await Order.insert({ quantity: 24 });
    await Order.deleteOrderById(2);
    const orderDB = await Order.getAll();

      expect(orderDB).toEqual([result]);
  });
});
