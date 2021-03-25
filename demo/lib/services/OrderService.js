const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );
    const order = await Order.insert({ quantity });
    return order;
  }

  static async getOrders() {
    const orders = await Order.getAll();
    return orders;
  }

  static async getOrderById(id) {
    const order = await Order.getOrderById(id);
    return order;
  }

  static async updateOrderById(quantity, id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id}'s quantity has been updated to ${quantity}`
    )
    const order = await Order.updateOrderById(quantity, id);
    return order;
  }

  static async deleteOrderById(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} has been deleted`
    )
    const order = await Order.deleteOrderById(id);
    return order;
  }
};
