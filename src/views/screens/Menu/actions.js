import {Parse} from 'parse/react-native';

export const fetchMenu = async () => {
  const Meal = Parse.Object.extend('Meal');
  const query = new Parse.Query(Meal);

  query.descending('timesOrdered');
  return query.find();
};

export const setStatus = async (meal, available) => {
  const Meal = Parse.Object.extend('Meal');
  const query = new Parse.Query(Meal);

  query.get(meal.id).then(object => {
    object.set('available', available);

    object.save().then(response => {}, error => {});
  });
};
