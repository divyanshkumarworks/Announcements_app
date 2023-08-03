import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
    const { db } = await connectToDatabase();
    const collection = db.collection('company_announcements');

    const announcements = await collection
      .find({ CRITICALNEWS: 1 })
      .toArray();

    res.status(200).json(announcements);
	}
  	catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}