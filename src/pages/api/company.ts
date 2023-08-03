import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  var scrip_cd = req.query.scrip_cd;

  const { db } = await connectToDatabase();
  const collection = db.collection('company_announcements');
  try {
    if (typeof(scrip_cd) === "object" ) {
    
      scrip_cd = scrip_cd.map((value) => parseInt(value as string))

      const announcements = await collection
        .find({ SCRIP_CD: { $in : scrip_cd } })
        .toArray();

      res.status(200).json(announcements);
    }
    else {
      const announcements = await collection
        .find({ SCRIP_CD: parseInt(scrip_cd as string) })
        .toArray();

      res.status(200).json(announcements);
    } 
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
}