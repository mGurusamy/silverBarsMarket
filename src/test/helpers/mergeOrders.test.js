import {mergeOrders} from '../../orderBoard/orders/helpers/mergeOrders';
const orderBoard = [
  {
    id: 'user1',
    quantity: 3.5,
    price: 300,
    type: 'SELL'
  },
  {
    id: 'user2',
    quantity: 1.2,
    price: 301,
    type: 'SELL'
  },
  {
    id: 'user3',
    quantity: 1.5,
    price: 302,
    type: 'SELL'
  },
  {
    id: 'user4',
    quantity: 2.0,
    price: 303,
    type: 'SELL'
  }
];

describe('mergeOrders - should not merge', () => {
  it('should not merge orderBoard elements when price are not the same', () => {
    const updatedOrders = mergeOrders(orderBoard);
    expect(updatedOrders).toEqual(orderBoard);
  });
});

describe('mergeOrders - should not merge - price are equal but types are differ', () => {
  let orderWithSamePriceButType =[];
  beforeEach(() => {
    orderWithSamePriceButType = orderBoard.slice();
    orderWithSamePriceButType[1].price = 300;
    orderWithSamePriceButType[1].type = 'BUY';
  });
  it('should not merge orderBoard elements when price are same but not types', () => {
    expect(mergeOrders(orderWithSamePriceButType)).toEqual(orderWithSamePriceButType);
  });
});

describe('mergeOrders - should merge - price and types are equal - SELL', () => {
  let orderWithSamePriceSellType =[];
  beforeEach(() => {
    orderWithSamePriceSellType = orderBoard.slice();
    orderWithSamePriceSellType[1].price = 300;
    orderWithSamePriceSellType[1].type = 'SELL';
  });
  it('should merge orderBoard elements when price and types are equal between elements', () => {
    const updatedOrders = mergeOrders(orderWithSamePriceSellType);
    expect(updatedOrders).toHaveLength(3);
    expect(updatedOrders[0].quantity).toEqual(4.7);
  });
});

describe('mergeOrders - should merge - price and types are equal - BUY', () => {
  let orderWithSamePriceBuyType = [];
  beforeEach(() => {
    orderWithSamePriceBuyType = orderBoard.slice();
    orderWithSamePriceBuyType[0].quantity = 3.5;
    orderWithSamePriceBuyType[1].price = 301;
    orderWithSamePriceBuyType[2].type = 'BUY';
    orderWithSamePriceBuyType[3].price = 302;
    orderWithSamePriceBuyType[3].type = 'BUY';
  });
  it('should merge orderBoard elements when price and types are equal between elements', () => {
    const updatedOrders = mergeOrders(orderWithSamePriceBuyType);
    expect(updatedOrders).toHaveLength(3);
    expect(updatedOrders[0].quantity).toEqual(3.5);
  });
});

describe('mergeOrders - should merge - price and types are equal - BUY AND SELL', () => {
  let orderWithSamePrice_equal = [];
  beforeEach(() => {
    orderWithSamePrice_equal = orderBoard.slice();
    orderWithSamePrice_equal[0].quantity = 3.5;
    orderWithSamePrice_equal[1].price = 300;
    orderWithSamePrice_equal[2].quantity = 1.5;
    orderWithSamePrice_equal[2].type = 'BUY';
    orderWithSamePrice_equal[3].price = 302;
    orderWithSamePrice_equal[3].type = 'BUY';
  });
  it('should merge orderBoard elements when price and types are equal between elements', () => {
    const updatedOrders = mergeOrders(orderWithSamePrice_equal);
    expect(updatedOrders).toHaveLength(2);
    expect(updatedOrders[0].quantity).toEqual(4.7);
    expect(updatedOrders[1].quantity).toEqual(3.5);
  });
});