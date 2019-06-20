function Order(id, quantity, price, type) {
  this.id = id,
  this.quantity = quantity,
  this.price = price,
  this.type = type
};

module.exports = {
  Order
}