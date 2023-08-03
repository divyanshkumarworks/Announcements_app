import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryvalues = req.query.scrip_cd;

  const { db } = await connectToDatabase();
  const collection = db.collection('company_announcements');
  try {
    if (typeof(queryvalues) !== "string" ) {
    
      const convertedArray = queryvalues.map((value) => Number(value));
      const announcements = await collection
        .find({ SCRIP_CD: { $in : convertedArray} })
        .toArray();

      res.status(200).json(announcements);
    }
    else {
      const announcements = await collection
        .find({ SCRIP_CD: parseInt(queryvalues as string) })
        .toArray();

      res.status(200).json(announcements);
    } 
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}