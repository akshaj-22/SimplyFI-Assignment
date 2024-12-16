'use strict';

const DrugContract = require('./lib/drug-contract');
const OrderContract = require('./lib/order-contract');

module.exports.DrugContract = DrugContract;
module.exports.OrderContract = OrderContract;

module.exports.contracts = [DrugContract, OrderContract];
