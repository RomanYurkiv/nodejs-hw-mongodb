// import mongoose from 'mongoose';

// import { env } from '../utils/env.js';

// export const initMongoConnection = async () => {
//   try {
//     const user = env('MONGODB_USER');
//     const pwd = env('MONGODB_PASSWORD');
//     const url = env('MONGODB_URL');
//     const db = env('MONGODB_DB');

//     await mongoose.connect(
//       "mongodb+srv://yurkivrofficial:zguobNrNhtvWhn61@cluster0romanyurkiv.leibckr.mongodb.net/",
//     );
//     console.log('Mongo connection successfully established!');
//   } catch (e) {
//     console.log('Error while setting up mongo connection', e);
//     throw e;
//   }
// };

import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL'); // This should be the cluster URL without "mongodb+srv://"
    const db = env('MONGODB_DB');

    console.log(user);
    console.log(pwd);
    console.log(url);
    console.log(db);

    // Construct the connection string
    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}`  
    console.log(connectionString);

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up mongo connection', e);
    throw e;
  }
};