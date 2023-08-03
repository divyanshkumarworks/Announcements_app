

import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb+srv://johnybravo2404:%40bcd1234@cluster0.ikxf9ss.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'financial_news';

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}