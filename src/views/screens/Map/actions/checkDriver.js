import {Parse} from 'parse/react-native';
import reactotron from 'reactotron-react-native';

const User = new Parse.User();

export const checkDriver = async (checked, currentLocation, Request) => {
  const user = await Parse.User.currentAsync();
  const query = new Parse.Query(User);

  if (user.get('location')) {
    if (checked == true) {
      await watchDelivaryRequest(user, Request);
    }

    query.get(user.id).then(user => {
      user.set('driverCheck', checked);
      user
        .save()
        .then(response => {})
        .catch(error => {});
    });
  } else {
    const Location = Parse.Object.extend('Location');
    const myNewObject = new Location();

    myNewObject.set('name', '');
    myNewObject.set('coordinate', {
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });

    myNewObject.save().then(
      result => {
        query.get(user.id).then(user => {
          user.set('driverCheck', checked);
          user.set('location', {
            __type: 'Pointer',
            className: 'Location',
            objectId: result.id,
          });
          user
            .save()
            .then(response => {
              reactotron.log(response);
            })
            .catch(error => {});
        });
      },
      error => {},
    );
  }
};

export const updateLocation = async position => {
  const user = await Parse.User.currentAsync();
  if (user.get('location')) {
    const Location = Parse.Object.extend('Location');
    const query = new Parse.Query(Location);

    query.get(user.get('location').id).then(object => {
      object.set('coordinate', {
        lat: position.latitude,
        lng: position.longitude,
      });
      object.save().then(
        response => {
          reactotron.log({response});
        },
        error => {},
      );
    });
  }
};

export const watchDelivaryRequest = (user, Request) => {
  const DelivaryRequest = Parse.Object.extend('DelivaryRequest');
  const query = new Parse.Query(DelivaryRequest);

  query.equalTo('driver', {
    __type: 'Pointer',
    className: '_User',
    objectId: user.id,
  });

  query
    .subscribe()
    .then(subscription => {
      reactotron.log(subscription);
      subscription.on('update', object => {
        reactotron.logImportant(object);
        // object.relation()
      });

      subscription.on('open', () => {
        reactotron.logImportant('subscription opened');
      });

      subscription.on('create', async object => {
        reactotron.logImportant(object);

        const res = {
          data: object.get('data'),
          id: object.id,
        };

        Request(res);
      });

      subscription.on('enter', object => {
        reactotron.logImportant('object entered');
      });

      subscription.on('leave', object => {
        reactotron.logImportant('object left');
      });

      subscription.on('delete', object => {
        reactotron.logImportant('object deleted');
      });

      subscription.on('close', () => {
        reactotron.logImportant('subscription closed');
      });
    })
    .catch(err => {
      reactotron.logImportant(err);
    });
};

export const sendMessage = async (id, message) => {
  const Message = Parse.Object.extend('Message');
  const newMessage = new Message();

  newMessage.set('sender', 'driver');
  newMessage.set('text', message);
  newMessage.set('request', {
    __type: 'Pointer',
    className: 'DelivaryRequest',
    objectId: id,
  });

  const response = await newMessage.save();
  reactotron.log({response});
};

export const watchChat = async (id, setMessages) => {
  const Message = Parse.Object.extend('Message');
  const query = new Parse.Query(Message);

  query.equalTo('request', {
    __type: 'Pointer',
    className: 'DelivaryRequest',
    objectId: id,
  });

  return query
    .subscribe()
    .then(subscription => {
      reactotron.log(subscription);
      subscription.on('update', object => {
        reactotron.logImportant(object);
      });

      subscription.on('open', () => {
        reactotron.logImportant('subscription opened');
      });

      subscription.on('create', async object => {
        reactotron.logImportant('create', object);

        setMessages(object);
      });
    })
    .catch(err => {
      reactotron.logImportant(err);
    });
};
