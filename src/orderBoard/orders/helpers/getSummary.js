const getSummary = (orders) => {
  const sellOrders = orders.filter(order => order.type === 'SELL');
  sellOrders.sort((o1, o2) => o1.price - o2.price);
  
  const buyOrders = orders.filter(order => order.type === 'BUY');
  buyOrders.sort((o1, o2) => -(o1.price - o2.price));

  return [...sellOrders, ...buyOrders];
}

module.exports ={
  getSummary
}