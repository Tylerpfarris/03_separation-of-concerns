const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', (req, res, next) => {
    OrderService
      .getOrders()
      .then(orders => res.send(orders))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id
    OrderService
      .getOrderById(id)
      .then(order => res.send(order))
      .catch(next);
  })

  .put('/:id', async (req, res, next) => {
    const id = req.params.id
    const quantity = req.body.quantity
    OrderService
      .updateOrderById(quantity, id)
      .then(order => res.send(order))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    OrderService
      .deleteOrderById(id)
      .then(order => res.send(order))
      .catch(next);
  });
