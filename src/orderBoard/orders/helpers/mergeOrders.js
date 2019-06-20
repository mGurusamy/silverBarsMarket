const mergeOrders = (orders) => {
  const updatedOrders = Array.from(orders);

  updatedOrders.map((element, index, array) => {
    for (let counter = ++index; counter < array.length; counter++) {
      if (array[counter]) {
        if (element.price === array[counter].price &&
            element.type === array[counter].type) {
          element.quantity += array[counter].quantity;
          updatedOrders.splice(counter, 1);
        }
      }
    }
  });
  return updatedOrders;
};

module.exports = {
  mergeOrders
}