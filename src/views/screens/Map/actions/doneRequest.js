import {Parse} from 'parse/react-native';
import reactotron from 'reactotron-react-native';

export const doneRequest = async requestObj => {
  const DelivaryRequest = Parse.Object.extend('DelivaryRequest');
  const query = new Parse.Query(DelivaryRequest);
  const object = await query.get(requestObj.id);

  object.set('status', 'done');

  const res = await object.save();
};
