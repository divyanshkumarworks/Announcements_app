import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  var query = req.query.query;
  console.log(query)
  query = query.map((value) => parseInt(value as string))
  console.log(typeof(query))
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('company_announcements');


    const announcements = await collection
      .find({ SCRIP_CD: { $in : query } })
      .toArray();

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
}