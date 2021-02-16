import {Parse} from 'parse/react-native';

export const fetchOrders = async type => {
  const Order = Parse.Object.extend('Order');
  const query = new Parse.Query(Order);

  query.descending('createdAt');
  query.equalTo('status', type);
  query.include(['client', 'driver']);

  return query.find();
};
