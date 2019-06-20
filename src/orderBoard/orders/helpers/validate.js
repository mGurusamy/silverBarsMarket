const validator = (order) =>
  (order.id && order.quantity && order.price && order.type && (order.type === 'SELL' || order.type === 'BUY')) ? true : false;

module.exports = {
  validator
}