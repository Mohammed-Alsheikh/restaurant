import {Parse} from 'parse/react-native';
import reactotron from 'reactotron-react-native';

export const createMeal = async (
  name,
  nameAr,
  desc,
  descAr,
  enoughFor,
  prepTime,
  price,
  image,
  menu,
) => {
  const Meal = Parse.Object.extend('Meal');
  const myNewObject = new Meal();

  myNewObject.set('name', name);
  myNewObject.set('nameAr', nameAr);
  myNewObject.set('description', desc);
  myNewObject.set('descriptionAr', descAr);
  myNewObject.set('enoughFor', enoughFor);
  myNewObject.set('prepTime', prepTime);
  myNewObject.set('price', price);

  myNewObject.set(
    'image',
    new Parse.File(image.fileName, {base64: image.data}),
  );

  const newMeal = await myNewObject.save();
  return menu
    .relation('meals')
    .add(newMeal)
    .save();
};

export const getTypes = async () => {
  const Menu = Parse.Object.extend('Menu');
  const query = new Parse.Query(Menu);

  return query.find();
};
