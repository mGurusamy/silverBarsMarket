// supertest

// 1) post an order for sell type(user1)
// 2) post an order for sell type(user2)
// 3) post an order for buy type(user3)
// 4) post an order for buy type(user4)
// 5) get summary for the above orders
// 6) delete order for sell(user2)
// 7) get summary for the above orders(1,3,4)
// 8) delete order for buy(user4)
// 9) get summary for the above orders(1,3)

/* eslint no-param-reassign: [2, { "props": false }] */

const supertest = require('supertest');
const {expect} = require('chai');
const {Order} = require('../../orderBoard/orders/model');
const HOST = 'http://localhost:8000';
const request = supertest(HOST);
const resStatus = {
  success: 200,
  invalidRequest: 400,
  internalError: 500
};

describe('Live OrderBoard App -Get', () => {
  it('should return empty array before posting any orders', async () => {
    const result = await request.get('/orders');
    console.log('RESULT BODY', result.body);
    expect(result.body).to.be.an('array').that.is.empty;
  });
});

describe('Live OrderBoard App -Post', () => {
  it('should return error value when order id is undefined', async () => {
    const order = new Order(undefined, 5.1, 300, 'SELL');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.invalidRequest);
    expect(result.body).to.deep.equal({
      message: `Order doesn't have valid information`
    });
  });
  it('should return error value when order quantity is undefined', async () => {
    const order = new Order('user1', undefined, 300, 'SELL');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.invalidRequest);
    expect(result.body).to.deep.equal({
      message: `Order doesn't have valid information`
    });
  });
  it('should return error value when order price is undefined', async () => {
    const order = new Order('user1', 5.1, undefined, 'SELL');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.invalidRequest);
    expect(result.body).to.deep.equal({
      message: `Order doesn't have valid information`
    });
  });
  it('should return error value when order type is undefined', async () => {
    const order = new Order('user1', 5.1, 300, undefined);
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.invalidRequest);
    expect(result.body).to.deep.equal({
      message: `Order doesn't have valid information`
    });
  });
  it('should return error value when order type is defined But neither SELL nor BUY', async () => {
    const order = new Order('user1', 5.1, 300, 'SOMETHINGELSE');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.invalidRequest);
    expect(result.body).to.deep.equal({
      message: `Order doesn't have valid information`
    });
  });
});

describe('Live OrderBoard App -Post', () => {
  it('should accept valid order and store them in InMemory', async () => {
    const order = new Order('user1', 3.5, 306, 'SELL');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.deep.equal(order);
  });
  it('should accept valid order and store them in InMemory', async () => {
    const order = new Order('user2', 1.2, 310, 'SELL');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.deep.equal(order);
  });
});

describe('Live OrderBoard App -Get after posting 2 orders', () => {
  it('should return two orders with price in ascending order', async () => {
    const result = await request.get('/orders');
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.have.lengthOf(2);
    expect(result.body[0].price).to.equal(306);
    expect(result.body[1].price).to.equal(310);
  });
});

describe('Live OrderBoard App -Post', () => {
  it('should accept valid order and store them in InMemory', async () => {
    const order = new Order('user3', 1.5, 307, 'BUY');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.deep.equal(order);
  });
  it('should accept valid order and store them in InMemory', async () => {
    const order = new Order('user4', 2.0, 306, 'BUY');
    const result = await request.post('/orders').send(order);
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.deep.equal(order);
  });
});

describe('Live OrderBoard App -Get after posting 4 orders', () => {
  it('should return two orders with price in ascending order', async () => {
    const result = await request.get('/orders');
    expect(result.status).to.equal(resStatus.success);
    expect(result.body).to.have.lengthOf(4);
    expect(result.body[0].price).to.equal(306);
    expect(result.body[1].price).to.equal(310);
    expect(result.body[2].price).to.equal(307);
    expect(result.body[3].price).to.equal(306);
  });
});

describe('Live OrderBoard App -Delete order for user-3', () => {
  it('should remove order from orderBoard', async () => {
    const result = await request.delete('/orders').send({'id': 'user3'});
    expect(result.status).to.equal(resStatus.success);
  });

  it('should get only 3 orders after removing order for user-3', async () => {
    const result = await request.get('/orders');
    expect(result.body).to.have.lengthOf(3);
  });
});

describe('Live OrderBoard App - clean', () => {
  let orders = [];
  it('should get all the orders', async () => {
    const result = await request.get('/orders');
    orders = result.body;
    expect(orders).to.have.lengthOf(3);
  });
  it('should delete all the orders', () => {
    orders.map(async (order) => {
      const result = await request.delete('/orders').send({'id': order.id});
      expect(result.status).to.equal(resStatus.success);
    })
  });
  it('should orderBoard empty after deleting all the orders', async () => {
    const result = await request.get('/orders');
    expect(result.body).to.be.an('array').that.is.empty;
  });
});

describe('Live OrderBoard App - Merge Quantity - OrderSummary', () => {
  it('should accept valid order and store them in InMemory', async () => {
    const orders = [
      new Order('user1', 3.5, 300, 'SELL'),
      new Order('user2', 1.5, 300, 'SELL'),
      new Order('user3', 2.0, 200, 'BUY'),
      new Order('user4', 4.0, 200, 'BUY')
    ];
    orders.map(async (order) => {
      await request.post('/orders').send(order);
    });
    const result = await request.get('/orders');
    expect(result.body).to.have.lengthOf(2);
    expect(result.body[0].quantity).to.equal(5.0);
    expect(result.body[1].quantity).to.equal(6.0);
  });
});