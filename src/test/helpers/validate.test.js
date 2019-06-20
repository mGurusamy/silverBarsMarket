import {validator} from '../../orderBoard/orders/helpers/validate';
import {Order} from '../../orderBoard/orders/model';

describe('helpers.validate', () => {
  let order;
  beforeEach(() => {
    order = new Order();
  });
  it('should validate return false when all properties are undefined', () => {
    expect(validator(order)).toBe(false);
  });
  it('should validate return false when id is undefined', () => {
    order = {
      id: undefined,
      quantity: 1.5,
      price: 100,
      type: 'SELL'
    }
    expect(validator(order)).toBe(false);
  });
  it('should validate return false when quantity is undefined', () => {
    order = {
      id: 'user1',
      quantity: undefined,
      price: 100,
      type: 'SELL'
    };
    expect(validator(order)).toBe(false);
  });
  it('should validate return false when price is undefined', () => {
    order = {
      id: 'user1',
      quantity: 1.5,
      price: undefined,
      type: 'SELL'
    };
    expect(validator(order)).toBe(false);
  });
  it('should validate return false when type is undefined', () => {
    order = {
      id: 'user1',
      quantity: 1.5,
      price: 100,
      type: undefined,
    };
    expect(validator(order)).toBe(false);
  });
});

describe('helpers.validate with defined type', () => {
  let order;
  beforeEach(() => {
    order = new Order('user1', 1.5, 200, 'SOMETHINGELSE');
  });
  it('should validate return false when type is defined but neither SELL nor BUY', () => {
    expect(validator(order)).toBe(false);
  });
});

describe('helpers.validate with order type === SELL', () => {
  let order;
  beforeEach(() => {
    order = new Order('user1', 1.5, 200, 'SELL');
  });
  it('should validate return true when order properties are defined with type as SELL', () => {
    expect(validator(order)).toBe(true);
  });
});

describe('helpers.validate with order type === BUY', () => {
  let order;
  beforeEach(() => {
    order = new Order('user1', 1.5, 200, 'BUY');
  });
  it('should validate return true when order properties are defined with type as BUY', () => {
    expect(validator(order)).toBe(true);
  });
});