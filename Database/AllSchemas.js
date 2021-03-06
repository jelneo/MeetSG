const Realm = require('realm');

export const EventSchema = {
	name: 'Event',
	primaryKey: 'id',
	properties: {
		id: 'int',
		name: 'string',
    location: 'string',
    type: 'string',
	}
};

// export const UserSchema = {
//   name: 'User',
//   primaryKey: 'email',
//   properties: {
//     email: 'string',
//     username: 'string',
//     password: 'string',
//     events: 'Event[]'
//   }
// }


const realmConfig = {
  path: 'database.realm',
  schema: [EventSchema]
}

function insertEvent(newEvent) {
// Get the default Realm with support for our objects
Realm.open(realmConfig)
  .then(realm => {
    realm.write(() => {
      realm.create('Event', newEvent);
    });
  })
  .catch(error => {
    console.log(error);
  });
}

//Reset database to it's original dummy value
function resetRealmFile() {

  Realm.open(realmConfig)
    .then(realm => {
      realm.write(() => {
        realm.deleteAll(); //delete all objects
        const newEvent1 = {
          id: 1,
          name: 'event',
          location: 'Bishan',
          type: 'Workout'
        };
        realm.create('Event', newEvent1);

        const newEvent2 = {
          id: 2,
          name: 'event2',
          location: 'Yio Chu Kang',
          type: 'Soccer'
        };
        realm.create('Event', newEvent2);
      });
    }).catch(error => {
      console.log(error);
    });
}

function queryAllEvent() {
  // Get the default Realm with support for our objects
  let allEvents;
Realm.open(realmConfig)
  .then(realm => {
    allEvents = realm.objects('Event');
    console.log(allEvents);
  })
  .catch(error => {
    console.log(error);
  });
  return allEvents;
}

// function getPath() {
//   let path = Realm.defaultPath;
//   console.log (path);
// }

//Realm.deleteFile(realmConfig); //Delete old database file

// function deleteModels() {
// Realm.open(realmConfig)
//   .then(realm => {
//     realm.write(() => {
//       realm.deleteModel('User');
//       realm.deleteModel('Event');
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

export default { queryAllEvent, insertEvent, resetRealmFile };
