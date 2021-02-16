import {Parse} from 'parse/react-native';
import reactotron from 'reactotron-react-native';

export const editMeal = async (
  name,
  nameAr,
  desc,
  descAr,
  enoughFor,
  prepTime,
  price,
  image,
  meal,
) => {
  const Meal = Parse.Object.extend('Meal');
  const query = new Parse.Query(Meal);

  const object = await query.get(meal.id);

  object.set('name', name);
  object.set('nameAr', nameAr);
  object.set('description', desc);
  object.set('descriptionAr', descAr);
  object.set('enoughFor', enoughFor);
  object.set('prepTime', prepTime);
  object.set('price', price);

  if (meal.get('image').url() !== image) {
    reactotron.log(image, meal.get('image').url());
    object.set('image', new Parse.File(image.fileName, {base64: image.data}));
  }
  return object.save();
};

export const getTypes = async () => {
  const Menu = Parse.Object.extend('Menu');
  const query = new Parse.Query(Menu);

  return query.find();
};

export const deleteMeal = async meal => {
  const Meal = Parse.Object.extend('Meal');
  const query = new Parse.Query(Meal);

  const object = await query.get(meal.id);
  return object.destroy();
};
