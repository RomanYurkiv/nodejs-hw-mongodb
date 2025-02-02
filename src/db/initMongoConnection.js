
import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    console.log(user);
    console.log(pwd);
    console.log(url);
    console.log(db);

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