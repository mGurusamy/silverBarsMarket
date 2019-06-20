import express from 'express';
import bodyParser from 'body-parser';
import {Order} from '../model/index';
import {validator} from '../helpers/validate';
import {mergeOrders} from '../helpers/mergeOrders';
import {getSummary} from '../helpers/getSummary';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const orderBoard = [];

// create a new order and push into orderBoard
router.post('/', (req, res) => {
  const body = req;
  const order = new Order(req.body.id, req.body.quantity, req.body.price, req.body.type);
  try {
    if(validator(order)){
      orderBoard.push(order);
      res.status(200).send(order);
    } else {
      res.status(400).send({ message: `Order doesn't have valid information` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Order couldn't be stored into order board` });
  }
});

// summary of order board
router.get('/', (req, res) => {
  res.status(200).send(getSummary(mergeOrders(orderBoard)));
});

// delete an order from orderBoard
router.delete('/', (req, res) => {
  const requestId = req.body.id;
  if(requestId){
    const deleteOrder = reqOrder(requestId);
    if(deleteOrder){
      const index = orderBoard.indexOf(deleteOrder);
      try {
        orderBoard.splice(index,1);
        return res.status(200).send({message: `Order Id: ${deleteOrder.id} successfully deleted`});
      } catch (error) {
        return res.status(500).send({message: `Internal Error while deleting order`});
      }
    } else {
      return res.status(404).send({message: `Requested Order Id not found in order board`});
    }
  } else {
    return res.status(400).send({message: `Requested Order Id is invalid`});
  }
});

const reqOrder = (reqId) =>{
  return orderBoard.find((order) => order.id === reqId);
}

module.exports = {
  router
}
