import {getSummary} from '../../orderBoard/orders/helpers/getSummary';
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
    price: 100,
    type: 'BUY'
  },
  {
    id: 'user3',
    quantity: 1.5,
    price: 400,
    type: 'SELL'
  },
  {
    id: 'user4',
    quantity: 2.0,
    price: 200,
    type: 'BUY'
  }
];

describe('helpers.getSummary', () => {
  it('should summary return SELL type orders in ascending order', () => {
    const summaryOrders = getSummary(orderBoard);
    expect(summaryOrders[1].type === 'SELL' && summaryOrders[0].type === 'SELL');
    expect(summaryOrders[1].price).toBeGreaterThan(summaryOrders[0].price);
  });
  it('should summary return BUY type orders in descending order', () => {
    const summaryOrders = getSummary(orderBoard);
    expect(
      summaryOrders[3].type === 'BUY' && summaryOrders[2].type === 'BUY'
    );
    expect(summaryOrders[3].price).toBeLessThan(summaryOrders[2].price);
  });
});