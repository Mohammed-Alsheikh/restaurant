import {Parse} from 'parse/react-native';
import reactotron from 'reactotron-react-native';

export const acceptReqeust = async (requestObj, price, setAcceptedStatus) => {
  const DelivaryRequest = Parse.Object.extend('DelivaryRequest');
  const query = new Parse.Query(DelivaryRequest);
  const object = await query.get(requestObj.id);
  object.set('accepted', true);
  object.set('price', price);
  object.set('status', 'ongoing');

  setAcceptedStatus(true);
  // object.set('messages', new Parse.Object('Message'));

  const res = await object.save();
  reactotron.logImportant('res', res);
};
