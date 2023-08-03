import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  var twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('company_announcements');

    const announcements = await collection
      .find({ DT_TM: { $gt : twoDaysAgo } })
      .toArray();

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
}